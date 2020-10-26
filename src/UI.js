import React, { useState } from 'react';
import ReactDOM from 'react-dom';
// import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import * as encode from './encode.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import ReactTooltip from 'react-tooltip';
const isHex = require('is-hex')

export class R_common extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        expression: "R_common", 
        rs: "",
        rt: "",
        rd: "",
        errors: {},
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.buttonDisabled = this.buttonDisabled.bind(this);
    }
    buttonDisabled() {
        const rs = this.state.rs;
        const rt = this.state.rt;
        const rd = this.state.rd;
        for (const [k, v] of Object.entries(this.state.errors))
            if(v) return true
        if(!rs || !rt || !rd) return true;
    }
    handleChange(event) {
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'rs': 
              errors["rs"] = 
                (!value) || !(Number.isInteger(Number(value))) || value.length > 2
                  ? 'Please Enter an integer with at most 2 digits'
                  : '';
              break;
            case 'rt': 
            errors["rt"] = 
                (!value) || !(Number.isInteger(Number(value))) || value.length > 2
                ? 'Please Enter an integer with at most 2 digits'
                : '';
             break;
            case 'rd': 
              errors["rd"] = 
                (!value) || !(Number.isInteger(Number(value))) || value.length > 2
                ? 'Please Enter an integer with at most 2 digits'
                : '';
              break;
            default:
              break;
        }
        this.setState({
            errors: errors, 
            [name]: value
        })
    }
    handleSubmit(event) {
      this.props.parentCallback(encode.encode_R_common(this.props.operation, this.state.rs, this.state.rt, this.state.rd), 
      (this.props.operation + "  $" + this.state.rd + ",  $" + this.state.rs + ",  $" + this.state.rt));
      event.preventDefault();
    }
    componentWillReceiveProps(nextProps) {
      if (this.props.operation !== nextProps.operation) {
        this.setState({errors: {}});
        Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
      }
    }
    render() {
      return (
    <form onSubmit={this.handleSubmit}>
          <div class="form-inline">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          </InputGroup.Prepend>
            <input 
              type="text" 
              name="rd" 
              onChange={this.handleChange}
              class="form-control" 
              placeholder="rd"
              data-tip={this.state.errors["rd"]} data-event = {this.state.errors["rd"] != ''}
              isInvalid={this.state.errors["rd"] !== ''} />
              <Form.Control.Feedback type="invalid" tooltip>
                {this.state.errors["rd"]}
              </Form.Control.Feedback>
            <div>{this.state.errors["rd"]}</div>
          </div>
      
          <div class="form-inline">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          </InputGroup.Prepend>
            <input 
              type="text" 
              name="rs" 
              onChange={this.handleChange}
              class="form-control" 
              placeholder="rs"  />
            <div>{this.state.errors["rs"]}</div>
          </div>

          <div class="form-inline">
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
            </InputGroup.Prepend>
            <input 
              type="text" 
              name="rt" 
              onChange={this.handleChange}
              class="form-control" 
              placeholder="rt" />
            <div>{this.state.errors["rt"]}</div>
          </div>
  
             
          <Button onClick = {this.handleSubmit} disabled = {this.buttonDisabled()}>Encode</Button >
        </form>
      );
    }
  }
  
export class R_shift extends React.Component {
constructor(props) {
    super(props)
    this.state = {
    expression: "R_shift", 
    rd: "",
    rt: "",
    shamt: "",
    errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
handleChange(event) {
    const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'rd': 
              errors["rd"] = 
                (!value) || !(Number.isInteger(Number(value))) || value.length > 2
                  ? 'Please Enter an integer with at most 2 digits'
                  : '';
              break;
            case 'rt': 
            errors["rt"] = 
                (!value) || !(Number.isInteger(Number(value))) || value.length > 2
                ? 'Please Enter an integer with at most 2 digits'
                : '';
             break;
            case 'shamt': 
              errors["shamt"] = 
                (!value) || !(Number.isInteger(Number(value))) || value.length > 2
                ? 'Please Enter an integer with at most 2 digits'
                : '';
              break;
            default:
              break;
        }
        this.setState({
            errors: errors, 
            [name]: value
        })
}
handleSubmit(event) {
    this.props.parentCallback(encode.encode_R_shift(this.props.operation, this.state.rd, this.state.rt, this.state.shamt), 
    (this.props.operation + "  $" + this.state.rd + ",  $" + this.state.rt + ",  $" + this.state.shamt));
    Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = "")
    );
    event.preventDefault();
}
buttonDisabled() {
    const rd = this.state.rd;
    const rt = this.state.rt;
    const shamt = this.state.shamt;
    for (const [k, v] of Object.entries(this.state.errors))
        if(v) return true
    if(!rd || !rt || !shamt) return true;
}

render() {
    return (
    <div class="form-inline">
       <form onSubmit={this.handleSubmit}>
          <div class="form-inline">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          </InputGroup.Prepend>
            <input 
              type="text" 
              name="rd" 
              onChange={this.handleChange}
              class="form-control" 
              placeholder="rd"
              data-tip={this.state.errors["rd"]} data-event = {this.state.errors["rd"] != ''}
              isInvalid={this.state.errors["rd"] !== ''} />
              <Form.Control.Feedback type="invalid" tooltip>
                {this.state.errors["rd"]}
              </Form.Control.Feedback>
            <div>{this.state.errors["rd"]}</div>
          </div>
      
          <div class="form-inline">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          </InputGroup.Prepend>
            <input 
              type="text" 
              name="rt" 
              onChange={this.handleChange}
              class="form-control" 
              placeholder="rt"  />
            <div>{this.state.errors["rt"]}</div>
          </div>

          <div class="form-inline">
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
            </InputGroup.Prepend>
            <input 
              type="text" 
              name="shamt" 
              onChange={this.handleChange}
              class="form-control" 
              placeholder="shift" />
            <div>{this.state.errors["shamt"]}</div>
          </div>
  
             
          <Button onClick = {this.handleSubmit} disabled = {this.buttonDisabled()}>Encode</Button >
        </form>
    </div>
    );
}
}

export class R_jr extends React.Component {
constructor(props) {
    super(props)
    this.state = {
    expression: "R_jr", 
    rs: "",
    errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
buttonDisabled() {
    const rs = this.state.rs;
    for (const [k, v] of Object.entries(this.state.errors))
        if(v) return true
    if(!rs) return true;
}

handleChange(event) {
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
        case 'rs': 
          errors["rs"] = 
            (!value) || !(Number.isInteger(Number(value))) || value.length > 2
              ? 'Please Enter an integer with at most 2 digits'
              : '';
          break;
        default:
          break;
    }
    this.setState({
        errors: errors, 
        [name]: value
    })
}
handleSubmit(event) {
    this.props.parentCallback(encode.encode_R_jr(this.props.operation, this.state.rs), 
    (this.props.operation + "  $" + this.state.rs));
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    this.setState({validated:true});
    Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = "")
    );
    event.preventDefault();
}
render() {
    return (
    <div class="form-inline">
        <form onSubmit={this.handleSubmit}>
          <div class="form-inline">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          </InputGroup.Prepend>
            <input 
              type="text" 
              name="rs" 
              onChange={this.handleChange}
              class="form-control" 
              placeholder="rs"
              data-tip={this.state.errors["rs"]} data-event = {this.state.errors["rs"] != ''}
              isInvalid={this.state.errors["rs"] !== ''} />
            <div>{this.state.errors["rs"]}</div>
          </div>             
          <Button onClick = {this.handleSubmit} disabled = {this.buttonDisabled()}>Encode</Button >
        </form>
    </div>
    );
}
}

export class I_common extends React.Component {
constructor(props) {
    super(props)
    this.state = {
    expression: "I_common", 
    rt: "",
    rs: "",
    imm: "",
    errors: {},
    hex: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
buttonDisabled() {
    const rt = this.state.rt;
    const rs = this.state.rs;
    const imm = this.state.imm;
    for (const [k, v] of Object.entries(this.state.errors))
        if(v) return true
    if(!rs || !rt || !imm) return true;
}
handleChange(event) {
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
        case 'hex':
          this.setState({hex: value})
          const imm = document.getElementById('imm').value
          if(value) {
            errors["imm"] = 
            !(isHex(imm)) || imm.length > 6
            ? 'Please Enter the part of hexadecimal number after 0x(eg. 1f3e)'
            : '';
          } else {
            errors["imm"] = 
            isNaN(Number(imm)) || imm.length > 2
            ? 'Please Enter an integer at most 2 digits(eg. 32)'
            : '';
          }
          break;
        case 'rs': 
          if(!value) errors['rs'] = 'Input cannot be empty'
          else{errors["rs"] = 
          !(Number.isInteger(Number(value))) || value.length > 2
            ? 'Please Enter an integer with at most 2 digits'
            : '';}
          break;
        case 'rt':
          if(!value) errors['rt'] = 'Input cannot be empty'   
          else {errors["rt"] = 
          !(Number.isInteger(Number(value))) || value.length > 2
          ? 'Please Enter an integer with at most 2 digits'
          : '';}
          break;
        case 'imm': 
          if(this.state.hex) {
            if(!value) errors['imm'] = 'Input cannot be empty'   
            else {
              errors["imm"] = 
              !(isHex(value)) || value.length > 6
              ? 'Please Enter the part of hexadecimal number after 0x(eg. 1f3e)'
              : '';
            }
          } else {
            if(!value) errors['imm'] = 'Input cannot be empty'   
            else {
              errors["imm"] = 
              isNaN(Number(value)) || value.length > 2
              ? 'Please Enter an integer at most 2 digits(eg. 32)'
              : '';
            }
          }
          break;
        default:
          break;
    }
        this.setState({
            errors: errors, 
            [name]: value,
        })
}
handleSubmit(event) {
    const prepend = (this.state.hex) ?'0x':'$';
    this.props.parentCallback(encode.encoder_I_common(this.props.operation, this.state.rt, this.state.rs, this.state.imm, this.state.hex), 
    (this.props.operation + "  $" + this.state.rt + ",  $" + this.state.rs + ",  " + prepend + this.state.imm));
    Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = "")
    );
    event.preventDefault();
}
render() {
    return (
    <div class="form-inline">
        <form onSubmit={this.handleSubmit}>
          <div class="form-inline">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          </InputGroup.Prepend>
            <input 
              type="text" 
              name="rt" 
              onChange={this.handleChange}
              class="form-control" 
              placeholder="rt" />
            <div>{this.state.errors["rt"]}</div>
          </div>
      
          <div class="form-inline">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          </InputGroup.Prepend>
            <input 
              type="text" 
              name="rs" 
              onChange={this.handleChange}
              class="form-control" 
              placeholder="rs"  />
            <div>{this.state.errors["rs"]}</div>
          </div>

          <label>For hexadecimal input check(打勾) this 👉👉👉
            </label>
          <div class="form-inline">
          <input type="checkbox" id = "hexcheck" name="hex" onChange = {this.handleChange} value= {true} />
          <label for="hex"><strong id = "hexlabel">0x</strong></label>
            <input 
              id = "imm"
              type="text" 
              name="imm" 
              onChange={this.handleChange}
              class="form-control" 
              placeholder="imm" />
            <div>{this.state.errors["imm"]}</div>
          </div>
  
             
          <Button onClick = {this.handleSubmit} disabled = {this.buttonDisabled()}>Encode</Button >
        </form>
    </div>
    );
}
}

export class I_branch extends React.Component {
constructor(props) {
    super(props)
    this.state = {
    expression: "I_branch",
    rs: "",
    rt: "",
    label: "",
    validated: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
}
handleSubmit(event) {
    this.props.parentCallback(encode.encoder_I_branch(this.props.operation, this.state.rs, this.state.rt, this.state.label), 
    (this.props.operation + "  $" + this.state.rs + ",  $" + this.state.rt + ",  $" + this.state.label));
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    this.setState({validated:true});
    Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = "")
    );
    event.preventDefault();
}
render() {
    return (
    <div class="form-inline">
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                    name = "rs"
                    type="text"
                    placeholder="rs"
                    aria-describedby="inputGroupPrepend"
                    onChange = {this.handleChange}
                    required
                    />
                    <Form.Control.Feedback type="invalid">Please Enter an integer</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                    name = "rt"
                    type="text"
                    placeholder="rt"
                    aria-describedby="inputGroupPrepend"
                    onChange = {this.handleChange}
                    required
                    />
                    <Form.Control.Feedback type="invalid">Please Enter an integer</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            name = "label"
                            type="text"
                            placeholder="label"
                            aria-describedby="inputGroupPrepend"
                            onChange = {this.handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">Please Enter an integer</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Form.Row>
            <Form.Row>
            </Form.Row>
            <Button type="submit">Encode</Button>
        </Form>
    </div>
    );
}
}

export class I_ls extends React.Component {
constructor(props) {
    super(props)
    this.state = {
    expression: "I_ls", 
    rt: "",
    imm: "",
    rs: "",
    validated:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
}
handleSubmit(event) {
    this.props.parentCallback(encode.encoder_I_ls(this.props.operation, this.state.rt, this.state.imm, this.state.rs), 
    (this.props.operation + "  $" + this.state.rt + ",  (" + this.state.imm + ")  $" + this.state.rs));
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    this.setState({validated:true});
    Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = "")
    );
    event.preventDefault();
}
render() {
    return (
    <div class="form-inline">
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                    name = "rt"
                    type="text"
                    placeholder="rt"
                    aria-describedby="inputGroupPrepend"
                    onChange = {this.handleChange}
                    required
                    />
                    <Form.Control.Feedback type="invalid">Please Enter an integer</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">                    
                    (<Form.Control
                    name = "imm"
                    type="text"
                    placeholder="immediate"
                    aria-describedby="inputGroupPrepend"
                    onChange = {this.handleChange}
                    required
                    />)
                    <Form.Control.Feedback type="invalid">Please Enter an integer</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            name = "rs"
                            type="text"
                            placeholder="rs"
                            aria-describedby="inputGroupPrepend"
                            onChange = {this.handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">Please Enter an integer</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Form.Row>
            <Form.Row>
            </Form.Row>
            <Button type="submit">Encode</Button>
        </Form>
    </div>
    );
}
}

export class I_lui extends React.Component {
constructor(props) {
    super(props)
    this.state = {
    expression: "I_lui",
    rt: "",
    imm: "",
    validated: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
}
handleSubmit(event) {
    this.props.parentCallback(encode.encoder_I_lui(this.props.operation, this.state.rt, this.state.imm), 
    (this.props.operation + "  $" + this.state.rt + ", " + this.state.imm + " "));
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    this.setState({validated:true});
    Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = "")
    );
    event.preventDefault();
}
render() {
    return (
    <div class="form-inline">
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                    name = "rt"
                    type="text"
                    placeholder="rt"
                    aria-describedby="inputGroupPrepend"
                    onChange = {this.handleChange}
                    required
                    />
                    <Form.Control.Feedback type="invalid">Please Enter an integer</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <InputGroup>
                        <Form.Control
                            name = "imm"
                            type="text"
                            placeholder="imm"
                            aria-describedby="inputGroupPrepend"
                            onChange = {this.handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">Please Enter an integer</Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Form.Row>
            <Form.Row>
            </Form.Row>
            <Button type="submit">Encode</Button>
        </Form>
    </div>
    );
}
}

export class J extends React.Component {
constructor(props) {
    super(props)
    this.state = {
    expression: "J",
    label:"",
    validated:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    if(this.state.label === "hello") {
        this.setState({validated:false});
    }
}
handleSubmit(event) {
    this.props.parentCallback(encode.encoder_J(this.props.operation, this.state.label), 
    (this.props.operation + "  $" + this.state.label));
    const form = event.currentTarget;
    //if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
    //}
    this.setState({validated:true});
    // Array.from(document.querySelectorAll("input")).forEach(
    // input => (input.value = "")
    // );
    //event.preventDefault();
}
render() {
    return (
    <div class="form-inline">
                <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                </InputGroup.Prepend>
                    <InputGroup md = "4">
                        <Form.Control
                            name = "label"
                            type="text"
                            placeholder="label"
                            aria-describedby="inputGroupPrepend"
                            onChange = {this.handleChange}
                            required
                        />
                        <Form.Control.Feedback type="invalid">Please Enter an hexadicimal number</Form.Control.Feedback>
                    </InputGroup>
            <Button type="submit">Encode</Button>
        </Form>
    </div>
    );
}
}
