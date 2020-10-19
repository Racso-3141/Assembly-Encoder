import React from 'react';
import ReactDOM from 'react-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import './App.css';
import {R_common, R_shift, R_jr, I_common, I_branch, I_ls, I_lui, J} from './UI';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expression: "",
      operation: "", 
      result:"",
      copied: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.getResult = this.getResult.bind(this);
  }
  handleChange(event) {
    this.setState({
      expression: event.target.value,
      operation: event.nativeEvent.target[event.nativeEvent.target.selectedIndex].text
    });
  }
  getResult(childData) {
    this.setState({
        result: childData
    });
  }
  render() {
    let expression = this.state.expression;
    let operation = this.state.operation;
    let ui;
    if (expression === "R_common") {
      ui = <R_common operation = {operation} parentCallback = {this.getResult}/>
    } else if(expression === "R_shift") {
      ui = <R_shift operation = {operation} parentCallback = {this.getResult}/>
    } else if(expression === "R_jr") {
      ui = <R_jr operation = {operation} parentCallback = {this.getResult}/>
    } else if(expression === "I_common") {
      ui = <I_common operation = {operation} parentCallback = {this.getResult}/>
    } else if(expression === "I_branch") {
      ui = <I_branch operation = {operation} parentCallback = {this.getResult}/>
    } else if(expression === "I_ls") {
      ui = <I_ls operation = {operation} parentCallback = {this.getResult}/>
    } else if(expression === "I_lui") {
      ui = <I_lui operation = {operation} parentCallback = {this.getResult}/>
    } else if(expression === "J") {
      ui= <J operation = {operation} parentCallback = {this.getResult}/>
    }
    return (
      <div>
        <form>
          <label>
            <select onChange={this.handleChange} defaultValue="">
              <option disabled={true} value="">select an function</option>
              <option value="R_common">add</option>
              <option value="R_common">addu</option>
              <option value="R_common">and</option>
              <option value="R_common">or</option>
              <option value="R_common">nor</option>
              <option value="R_common">slt</option>
              <option value="R_common">sltu</option>
              <option value="R_common">sub</option>
              <option value="R_common">subu</option>
              <option value="R_common">div</option>
              <option value="R_common">divu</option>
              <option value="R_common">mult</option>
              <option value="R_common">multu</option>
              <option value="R_common">xor</option>
              <option value="R_shift">sll</option>
              <option value="R_shift">srl</option>
              <option value="R_jr">jr</option>
              <option value="I_common">addi</option>
              <option value="I_common">addiu</option>
              <option value="I_common">andi</option>
              <option value="I_common">ori</option>
              <option value="I_common">slti</option>
              <option value="I_common">sltiu</option>
              <option value="I_common">xori</option>
              <option value="I_branch">beq</option>
              <option value="I_branch">bne</option>
              <option value="I_ls">lb</option>
              <option value="I_ls">lbu</option>
              <option value="I_ls">lw</option>
              <option value="I_ls">sb</option>
              <option value="I_ls">sw</option>
              <option value="I_lui">lui</option>
              <option value="J">j</option>
              <option value="J">jal</option>
            </select>
          </label>
        </form>
        {ui}
        {this.state.result}
        <CopyToClipboard text={this.state.result}
          onCopy={() => this.setState({copied: true})}>
          <Tippy trigger = 'click' content = "Copied!" delay={[10, 10]} hideDelay = {10} placement = "bottom" >
            <button>Copy</button>
          </Tippy>
        </CopyToClipboard>
      </div>
    );
  }
}

export default App;
