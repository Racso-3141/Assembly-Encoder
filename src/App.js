import React from 'react';
import ReactDOM from 'react-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; 
import './App.css';
import ReactTooltip from 'react-tooltip';
import {R_common, R_shift, R_jr, I_common, I_branch, I_ls, I_lui, J} from './UI';
import FormExample from './scratch';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/Dropdown';

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
      expression: event.value,
      operation: event.nativeEvent.[event.nativeEvent.selectedIndex].text
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
            <select onChange={this.handleChange}>
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
        <Dropdown onSelect = {this.handleChange}>
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            Select a function
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/add" value = "R_common">add</Dropdown.Item>
            <Dropdown.Item href="#/addu" value = "R_common">addu</Dropdown.Item>
            <Dropdown.Item href="#/and" value = "R_common">and</Dropdown.Item>
            <Dropdown.Item href="#/or" value = "R_common">or</Dropdown.Item>
            <Dropdown.Item href="#/nor" value = "R_common">nor</Dropdown.Item>
            <Dropdown.Item href="#/slt" value = "R_common">slt</Dropdown.Item>
            <Dropdown.Item href="#/sltu" value = "R_common">sltu</Dropdown.Item>
            <Dropdown.Item href="#/sub" value = "R_common">sub</Dropdown.Item>
            <Dropdown.Item href="#/subu" value = "R_common">subu</Dropdown.Item>
            <Dropdown.Item href="#/div" value = "R_common">div</Dropdown.Item>
            <Dropdown.Item href="#/divu" value = "R_common">divu</Dropdown.Item>
            <Dropdown.Item href="#/mult" value = "R_common">mult</Dropdown.Item>
            <Dropdown.Item href="#/multu" value = "R_common">multu</Dropdown.Item>
            <Dropdown.Item href="#/xor" value = "R_common">xor</Dropdown.Item>
            <Dropdown.Item href="#/sll" value="R_shift">sll</Dropdown.Item>
            <Dropdown.Item href="#/srl" value="R_shift">srl</Dropdown.Item>
            <Dropdown.Item href="#/jr" value="R_jr">jr</Dropdown.Item>
            <Dropdown.Item href="#/addi" value="I_common">addi</Dropdown.Item>
            <Dropdown.Item href="#/addiu" value="I_common">addiu</Dropdown.Item>
            <Dropdown.Item href="#/andi" value="I_common">andi</Dropdown.Item>
            <Dropdown.Item href="#/ori" value="I_common">ori</Dropdown.Item>
            <Dropdown.Item href="#/slti" value="I_common">slti</Dropdown.Item>
            <Dropdown.Item href="#/sltiu" value="I_common">sltiu</Dropdown.Item>
            <Dropdown.Item href="#/xori" value="I_common">xori</Dropdown.Item>
            <Dropdown.Item href="#/beq" value="I_branch">beq</Dropdown.Item>
            <Dropdown.Item href="#/bne" value="I_branch">bne</Dropdown.Item>
            <Dropdown.Item href="#/lb" value="I_ls">lb</Dropdown.Item>
            <Dropdown.Item href="#/lbu" value="I_ls">lbu</Dropdown.Item>
            <Dropdown.Item href="#/lw" value="I_ls">lw</Dropdown.Item>
            <Dropdown.Item href="#/sb" value="I_ls">sb</Dropdown.Item>
            <Dropdown.Item href="#/sw" value="I_ls">sw</Dropdown.Item>
            <Dropdown.Item href="#/lui" value="I_lui">lui</Dropdown.Item>
            <Dropdown.Item href="#/j" value="J">j</Dropdown.Item>
            <Dropdown.Item href="#/jal" value="J">jal</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {ui}
          {this.state.result}
          <CopyToClipboard text={this.state.result}
            onCopy={() => this.setState({copied: true})}>
            <Button variant="secondary">Copy</Button>
          </CopyToClipboard>
      </div>
    );
  }
}

export default App;
