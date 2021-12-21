
import { Component } from 'react';
import './App.css';
import CalculatorDisplay from './CalculatorDisplay';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      operation: null,
      stack: '0',
      buffer: null
    };
  }

  updateStack(value, stack) {
    stack += value;
    // console.log(stack);
    this.setState({ stack: stack });
  }

  setOperation(op) {
    let {stack} = this.state;

    this.onEqual();
    this.setState({buffer: stack, operation: op, stack: '0'});
  }
  
  onEqual() {
    if (this.state.operation != null) {
        this.compute();
    }
  }

  compute() {
    let {buffer, operation, stack} = this.state;

    let arg1 = Number(buffer);
    let arg2 = Number(stack);

    buffer = stack;
    stack = `${operation(arg1, arg2)}`;
    this.setState({buffer: buffer, stack: stack})
  }


  handleClear = () => {
    this.setState({ buffer: null, operation: null, stack: '0' });
  }

  handleKeyPress = (e) => {
    //console.log("key press ", e, " ", e.target)

    let stack = this.state.stack;
    let value = e.target.innerText;

    switch (value) {
      case '.':
        if (stack.indexOf(value) > -1) {
          return;
        }
        break;
      case '0':
        if (value === stack[0] && stack.length === 1) {
          return;
        }
        break;
      default:
        if (stack[0] === '0' && stack.length === 1) {
          stack = ''
        }
    }

    this.updateStack(value, stack);
  }

  handleOpSelection = (e) => {

    let {stack} = this.state;
    let value = e.target.innerText;

    switch (value) {
      case '/':
        this.setOperation((a, b) => a/b);
        break;
      case '+':
        this.setOperation((a, b) => a+b);
        break;
      case '-':
        this.setOperation((a, b) => a-b);
        break;
      case 'x':
        this.setOperation((a, b) => a*b);
        break;
      case '%':
        stack = `${ Number(stack) * 0.01 }`
        this.setState({stack: stack});
        break;
      case '+/-':
          stack = `${ -1 * Number(stack) }`
          this.setState({stack: stack});
        break;
        case '=':
            this.onEqual();
        break;
        default:
        return;
    }
  }

  render() {
    let { stack } = this.state

    return (
      <div className='calculator-container'>
        <CalculatorDisplay value={stack} />

        <div className='calculator-grid'><button className='top-button' onClick={(e) => this.handleClear()}>AC</button></div>
        <div className='calculator-grid'><button className='top-button' onClick={(e) => this.handleOpSelection(e)}>+/-</button></div>
        <div className='calculator-grid'><button className='top-button' onClick={(e) => this.handleOpSelection(e)}>%</button></div>
        <div className='calculator-grid'><button className='base-math-button'  onClick={(e) => this.handleOpSelection(e)}>/</button></div>

        <div className='calculator-grid'><button onClick={(e) => this.handleKeyPress(e)}>7</button></div>
        <div className='calculator-grid'><button onClick={(e) => this.handleKeyPress(e)}>8</button></div>
        <div className='calculator-grid'><button onClick={(e) => this.handleKeyPress(e)}>9</button></div>
        <div className='calculator-grid'><button className='base-math-button' onClick={(e) => this.handleOpSelection(e)}>x</button></div>

        <div className='calculator-grid'><button onClick={(e) => this.handleKeyPress(e)}>4</button></div>
        <div className='calculator-grid'><button onClick={(e) => this.handleKeyPress(e)}>5</button></div>
        <div className='calculator-grid'><button onClick={(e) => this.handleKeyPress(e)}>6</button></div>
        <div className='calculator-grid'><button className='base-math-button' onClick={(e) => this.handleOpSelection(e)}>-</button></div>

        <div className='calculator-grid'><button onClick={(e) => this.handleKeyPress(e)}>1</button></div>
        <div className='calculator-grid'><button onClick={(e) => this.handleKeyPress(e)}>2</button></div>
        <div className='calculator-grid'><button onClick={(e) => this.handleKeyPress(e)}>3</button></div>
        <div className='calculator-grid'><button className='base-math-button' onClick={(e) => this.handleOpSelection(e)}>+</button></div>

        <div className='calculator-grid double-column'><button className='bottom-grid-left' onClick={(e) => this.handleKeyPress(e)}>0</button></div>
        <div className='calculator-grid'><button onClick={(e) => this.handleKeyPress(e)}>.</button></div>
        <div className='calculator-grid'><button className='bottom-grid-right base-math-button' onClick={(e) => this.handleOpSelection(e)}>=</button></div>
      </div>
    );
  }


}


export default App;
