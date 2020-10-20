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

const dict = {
  'add': "R_common", 'addu': "R_common", 'and': "R_common", 'or': "R_common", 'nor': "R_common", 
  'nor': "R_common", 'slt': "R_common", 'sltu': "R_common", 'sub': "R_common", 'subu': "R_common", 
  'div': "R_common", 'divu': "R_common", 'mult': "R_common", 'multu': "R_common", 
  'xor': "R_common", 'sll': "R_shift", 'srl': "R_shift", 'jr': "R_jr", 
  'addi': "I_common", 'addiu': "I_common", 'andi': "I_common", 'ori': "I_common", 
  'slti': "I_common", 'sltiu': "I_common", 'xori': "I_common", 'beq':'I_branch', 'bne':'I_branch',
  'lb':'I_ls', 'lbu':'I_ls', 'lw':'I_ls', 'sb':'I_ls', 'sw':'I_ls', 'lui':'I_lui',
  'j':'J', 'jal':'J'
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expression: "",
      operation: "666", 
      result:"",
      copied: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.getResult = this.getResult.bind(this);
  }
  handleSelect(ek, e) {
    this.setState({
      operation: ek,
      expression: dict[ek]
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
        <Dropdown onSelect = {this.handleSelect}>
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            Select
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/add" eventKey = "add">add</Dropdown.Item>
            <Dropdown.Item href="#/addu" eventKey = "addu">addu</Dropdown.Item>
            <Dropdown.Item href="#/and" eventKey = "and">and</Dropdown.Item>
            <Dropdown.Item href="#/or" eventKey = "or">or</Dropdown.Item>
            <Dropdown.Item href="#/nor" eventKey = "nor">nor</Dropdown.Item>
            <Dropdown.Item href="#/slt" eventKey = "slt">slt</Dropdown.Item>
            <Dropdown.Item href="#/sltu" eventKey = "sltu">sltu</Dropdown.Item>
            <Dropdown.Item href="#/sub" eventKey = "sub">sub</Dropdown.Item>
            <Dropdown.Item href="#/subu" eventKey = "subu">subu</Dropdown.Item>
            <Dropdown.Item href="#/div" eventKey = "div">div</Dropdown.Item>
            <Dropdown.Item href="#/divu" eventKey = "divu">divu</Dropdown.Item>
            <Dropdown.Item href="#/mult" eventKey = "mult">mult</Dropdown.Item>
            <Dropdown.Item href="#/multu" eventKey = "multu">multu</Dropdown.Item>
            <Dropdown.Item href="#/xor" eventKey = "xor">xor</Dropdown.Item>
            <Dropdown.Item href="#/sll" eventKey="sll">sll</Dropdown.Item>
            <Dropdown.Item href="#/srl" eventKey="srl">srl</Dropdown.Item>
            <Dropdown.Item href="#/jr" eventKey="jr">jr</Dropdown.Item>
            <Dropdown.Item href="#/addi" eventKey="addi">addi</Dropdown.Item>
            <Dropdown.Item href="#/addiu" eventKey="addiu">addiu</Dropdown.Item>
            <Dropdown.Item href="#/andi" eventKey="andi">andi</Dropdown.Item>
            <Dropdown.Item href="#/ori" eventKey="ori">ori</Dropdown.Item>
            <Dropdown.Item href="#/slti" eventKey="slti">slti</Dropdown.Item>
            <Dropdown.Item href="#/sltiu" eventKey="sltiu">sltiu</Dropdown.Item>
            <Dropdown.Item href="#/xori" eventKey="xori">xori</Dropdown.Item>
            <Dropdown.Item href="#/beq" eventKey="beq">beq</Dropdown.Item>
            <Dropdown.Item href="#/bne" eventKey="bne">bne</Dropdown.Item>
            <Dropdown.Item href="#/lb" eventKey="lb">lb</Dropdown.Item>
            <Dropdown.Item href="#/lbu" eventKey="lbu">lbu</Dropdown.Item>
            <Dropdown.Item href="#/lw" eventKey="lw">lw</Dropdown.Item>
            <Dropdown.Item href="#/sb" eventKey="sb">sb</Dropdown.Item>
            <Dropdown.Item href="#/sw" eventKey="sw">sw</Dropdown.Item>
            <Dropdown.Item href="#/lui" eventKey="lui">lui</Dropdown.Item>
            <Dropdown.Item href="#/j" eventKey="j">j</Dropdown.Item>
            <Dropdown.Item href="#/jal" eventKey="jal">jal</Dropdown.Item>
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
