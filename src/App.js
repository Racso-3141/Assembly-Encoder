import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './../node_modules/tippy.js/dist/tippy.css'; 
import './App.css';
import {R_common, R_shift, R_jr, I_common, I_branch, I_ls, I_lui, J} from './UI';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; 

const dict = {
  'add': "R_common", 'addu': "R_common", 'and': "R_common", 'or': "R_common", 
  'nor': "R_common", 'slt': "R_common", 'sltu': "R_common", 'sub': "R_common", 'subu': "R_common", 
  'div': "R_common", 'divu': "R_common", 'mult': "R_common", 'multu': "R_common", sltu: 'R_common',
  'xor': "R_common", 'sll': "R_shift", 'srl': "R_shift", 'jr': "R_jr", 
  'addi': "I_common", 'addiu': "I_common", 'andi': "I_common", 'ori': "I_common", 
  'slti': "I_common", 'sltiu': "I_common", 'xori': "I_common", 'beq':'I_branch', 'bne':'I_branch',
  'lb':'I_ls', 'lbu':'I_ls', sh: "I_ls", lh: "I_ls", lhu: "I_ls",'lw':'I_ls', 'sb':'I_ls', 'sw':'I_ls', 'lui':'I_lui',
  'j':'J', 'jal':'J'
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expression: "",
      operation: "Select", 
      result:"",
      copied: false,
      default: true,
      instruction: "",
      dif: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.getResult = this.getResult.bind(this);
  }
  handleSelect(ek, e) {
    this.setState({
      operation: ek,
      expression: dict[ek],
      default:false,
      instruction: '',
      result: '',
      dif: true
    });
  }
  getResult(childData, childInstruction) {
    this.setState({
        result: childData,
        instruction: childInstruction
    });
  }
  render() {
    let expression = this.state.expression;
    let operation = this.state.operation;
    let ui;
    let title;
    let copy_btn;
    if(this.state.default) {
      title = (
        <div>
          <h1>Welcome to Assembly Encoder! My friend</h1>
          <h4>👇 Select an function below to get started</h4>
        </div>
      );  
    }
    if(this.state.operation !== "Select") {
      copy_btn = (
        <div className="flex-row row-between">
        {this.state.result ? <p className="copy-text">{this.state.result}</p>: null}
            <CopyToClipboard text={this.state.result}
              onCopy={() => this.setState({copied: true})}>
              <Button id = "copyBtn">Copy</Button>
            </CopyToClipboard>
        </div>
      )
      tippy('#copyBtn', {
        placement: 'top', 
        arrow: true,
        animation: 'shift-toward',
        trigger: 'click',
        content: 'Copied!',
        hideOnClick: false, 
        onShow(instance) {
          setTimeout(() => {
            instance.hide();
          }, 200);
        }
      });
    }
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
      <div className="out-container">
        {title}
        <h2 align = "center">{this.state.instruction}</h2>
        <div className="flex-row">
          <Dropdown onSelect = {this.handleSelect}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              <span className="select-title">{operation}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey = "add">add</Dropdown.Item>
              <Dropdown.Item eventKey = "addu">addu</Dropdown.Item>
              <Dropdown.Item eventKey="addi">addi</Dropdown.Item>
              <Dropdown.Item eventKey="addiu">addiu</Dropdown.Item>
              <Dropdown.Item eventKey = "and">and</Dropdown.Item>
              <Dropdown.Item eventKey="andi">andi</Dropdown.Item>
              <Dropdown.Item eventKey="beq">beq</Dropdown.Item>
              <Dropdown.Item eventKey="bne">bne</Dropdown.Item>
              <Dropdown.Item eventKey = "div">div</Dropdown.Item>
              <Dropdown.Item eventKey = "divu">divu</Dropdown.Item>
              <Dropdown.Item eventKey="j">j</Dropdown.Item>
              <Dropdown.Item eventKey="jr">jr</Dropdown.Item>
              <Dropdown.Item eventKey="jal">jal</Dropdown.Item>
              <Dropdown.Item eventKey="lb">lb</Dropdown.Item>
              <Dropdown.Item eventKey="lbu">lbu</Dropdown.Item>
              <Dropdown.Item eventKey="lh">lh</Dropdown.Item>
              <Dropdown.Item eventKey="lhu">lhu</Dropdown.Item>
              <Dropdown.Item eventKey="lui">lui</Dropdown.Item>
              <Dropdown.Item eventKey="lw">lw</Dropdown.Item>
              <Dropdown.Item eventKey = "mult">mult</Dropdown.Item>
              <Dropdown.Item eventKey = "multu">multu</Dropdown.Item>
              <Dropdown.Item eventKey = "nor">nor</Dropdown.Item>
              <Dropdown.Item eventKey = "or">or</Dropdown.Item>
              <Dropdown.Item eventKey="ori">ori</Dropdown.Item>
              <Dropdown.Item eventKey="sb">sb</Dropdown.Item>
              <Dropdown.Item eventKey="sh">sh</Dropdown.Item>
              <Dropdown.Item eventKey = "slt">slt</Dropdown.Item>
              <Dropdown.Item eventKey="slti">slti</Dropdown.Item>
              <Dropdown.Item eventKey = "sltu">sltu</Dropdown.Item>
              <Dropdown.Item eventKey="sltiu">sltiu</Dropdown.Item>
              <Dropdown.Item eventKey="sll">sll</Dropdown.Item>
              <Dropdown.Item eventKey="srl">srl</Dropdown.Item>
              <Dropdown.Item eventKey = "sub">sub</Dropdown.Item>
              <Dropdown.Item eventKey = "subu">subu</Dropdown.Item>
              <Dropdown.Item eventKey="sw">sw</Dropdown.Item>
              <Dropdown.Item eventKey = "xor">xor</Dropdown.Item>
              <Dropdown.Item eventKey="xori">xori</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {ui}
        </div>
        <hr width="800" align="left"/>
        {copy_btn}
      </div>    
    );
  }
}

export default App;
