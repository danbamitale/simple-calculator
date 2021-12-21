// import react, {component} from 'react';


function CalculatorDisplay(props) {
    let stack = props.value;
    if (stack.length > 10) {
        stack = Number(stack).toPrecision(6).toString();
    }
    return (
    <div className='display-container'>
        <p className='display'>{stack.length > 0 ? stack : "0"}</p>
      </div>
    );
}

export default CalculatorDisplay;
