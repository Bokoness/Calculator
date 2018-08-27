//TODO:
// does nothing for 0000.8*6
// I tried to type 1.0+0.2 but can't.

const styles = {
	CalcBody: {
	  background:" -webkit-linear-gradient(#cdcecc, #e2e1e0)", 
	  background: "-moz-linear-gradient(#cdcecc, #e2e1e0)",
		margin: "auto",
		marginTop: "10%",
	  border: "1px solid grey",
		width: 160,
		display: "flex",
		flexDirection: "column",
		padding: 10,
		borderRadius: 30,
		boxShadow: "-2px -2px 5px grey",
		boxShadow: "12px 12px 5px grey"
	},
	header: {
	  fontSize: 7,
	  textAlign: "center",
	},
	CalcScreen: {
	  background: "#f2f3f1",
	  border: "1px solid grey",
		margin: 5,
		paddingLeft: 5,
		paddingRight: 5,
		minHeight: 20,
		borderRadius: 5,
		boxShadow: "2px 2px 5px grey"

	},
	CalcButtonLine: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
	},
	CalcButton : {
	  width: 30,
	  margin: 2,
	  borderRadius: 25,
	  border: "1px solid grey",
		boxShadow: "2px 2px 5px grey"
	}
};

const App = () => {
  return (
    <div>
      <CalcBody/>
    </div>  
  )
}

class CalcBody extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			number: [0],
			count: 0,
			index:[0]
		};
	};
	
  render() {
    return (
      <div style={styles.CalcBody}>
				<span style={styles.header}>Made by Bokoness</span>
				<CalcScreen number={this.state.number}/>
				<div style={styles.CalcButtonLine}>
					<CalcButton id="acButton" handleNumberState={()=>this.handleNumberState("AC")} text={"AC"}/>
					<CalcButton handleNumberState={()=>this.handleNumberState("CE")} text={"CE"}/>
				</div>
				<div style={styles.CalcButtonLine}>
					<CalcButton handleNumberState={()=>this.handleNumberState("1")} text={"1"}/>
					<CalcButton handleNumberState={()=>this.handleNumberState("2")} text={"2"}/>
					<CalcButton handleNumberState={()=>this.handleNumberState("3")} text={"3"}/>
					<CalcButton handleNumberState={()=>this.handleNumberState("/")} text={"/"}/>
				</div>
				<div style={styles.CalcButtonLine}>
					<CalcButton handleNumberState={()=>this.handleNumberState("4")} text={"4"}/>
					<CalcButton handleNumberState={()=>this.handleNumberState("5")} text={"5"}/>
					<CalcButton handleNumberState={()=>this.handleNumberState("6")} text={"6"}/>
					<CalcButton handleNumberState={()=>this.handleNumberState("*")} text={"X"}/>
				</div>
				<div style={styles.CalcButtonLine}>
					<CalcButton handleNumberState={()=>this.handleNumberState("7")} text={"7"}/>
					<CalcButton handleNumberState={()=>this.handleNumberState("8")} text={"8"}/>
					<CalcButton handleNumberState={()=>this.handleNumberState("9")} text={"9"}/>
					<CalcButton handleNumberState={()=>this.handleNumberState("-")} text={"-"}/>
				</div>
				<div style={styles.CalcButtonLine}>
					<CalcButton handleNumberState={()=>this.handleNumberState("0")} text={"0"}/>
					<CalcButton handleNumberState={()=>this.handleNumberState(".")} text={"."}/>
					<CalcButton handleNumberState={()=>this.handleNumberState("=")} text={"="}/>
					<CalcButton handleNumberState={()=>this.handleNumberState("+")} text={"+"}/>
				</div>
			</div>
    )
  }
  
  handleNumberState(val) {
    let num = this.state.number;
		let idx = this.state.index;

		//if val is AC
		if(val === "AC") {
			num = [0];
			this.setState({index: 0, count: 0})
		}

		//if val is CE
		else if(val === "CE")
		  if(idx == 0)
		    num = [0];
		  else
			  num[idx] = "";

		//if val is =
		else if(val === "=") {
			num = [this.sumNumberState(num)];
			this.setState({index: 0})
		}

		//if val is +-*/
		else if (val === "+" || val === "-" || val === "/" || val === "*") {
			num.push(val);
			idx++;
			num.push("");
			idx++;
			this.setState({index: idx});
		}
		//if val is .
		else if (val === ".") {
			//if there is a dot in number - function will avoid adding another dot
			if(!this.searchVal(num[idx], val)) {
				num[idx] += val;
			}
		}

		else //checks if Calc displays 0
			num.length <= 1 && num[0] === 0 ? num = [val] : num[idx] += val;
			
		  console.log(num);
		  this.setState({number: num});
	};
	
	sumNumberState(arr) {
		let count = eval(arr.join(""));
		console.log("count: " + count);
		return count;
	};
	
	//search for a specific digit in array
	searchVal(arr, val) {
		for(let i = 0; i < arr.length; i++) {
				if(arr[i] === val)
					return true;
		}
		return false;
	};
}
  

//Calculator Screen
const CalcScreen = (props) => (
	<div style={styles.CalcScreen}>{props.number}</div>
);

//Calculator Button
const CalcButton = (props) => (
	<div><button style={styles.CalcButton} onClick={props.handleNumberState}>{props.text}</button></div>
);


/* -------------- Render -----------------*/
ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
