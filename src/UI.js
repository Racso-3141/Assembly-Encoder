import React, { useState } from 'react';
import ReactDOM from 'react-dom';
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
    }
    buttonDisabled() {
      const rs = this.state.rs;
      const rt = this.state.rt;
      const rd = this.state.rd;
      for (const [k, v] of Object.entries(this.state.errors)) if(v) return true;
      if(!rs || !rt || !rd) return true;
    }
    handleChange(event) {
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
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
        case 'rd':
            if(!value) errors['rd'] = 'Input cannot be empty'   
            else {errors["rd"] = 
              !(Number.isInteger(Number(value))) || value.length > 2
              ? 'Please Enter an integer with at most 2 digits'
              : '';}
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
    case 'shamt': 
      if(!value) errors['shamt'] = 'Input cannot be empty'   
      else {
        if(!(Number.isInteger(Number(value))) && value !== '-') 
          errors['shamt'] = 'Please Enter an integer(eg. 45)'
        else{
          const v = (Number(value) < 0) ? value.slice(1) : value;
          errors["shamt"] = v.length > 2 ? 'Please Enter an integer at most 2 digits(eg. 32, -21)': '';
        }
      }
      break;
  case 'rt':
    if(!value) errors['rt'] = 'Input cannot be empty'   
    else {errors["rt"] = 
    !(Number.isInteger(Number(value))) || value.length > 2
    ? 'Please Enter an integer with at most 2 digits'
    : '';}
    break;
  case 'rd':
      if(!value) errors['rd'] = 'Input cannot be empty'   
      else {errors["rd"] = 
        !(Number.isInteger(Number(value))) || value.length > 2
        ? 'Please Enter an integer with at most 2 digits'
        : '';}
  default:
    break;
  }
  this.setState({
      errors: errors, 
      [name]: value
  })}
handleSubmit(event) {
    this.props.parentCallback(encode.encode_R_shift(this.props.operation, this.state.rd, this.state.rt, this.state.shamt), 
    (this.props.operation + "  $" + this.state.rd + ",  $" + this.state.rt + ",  " + this.state.shamt));
    Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
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
componentWillReceiveProps(nextProps) {
  if (this.props.operation !== nextProps.operation) {
    this.setState({errors: {}});
    Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
  }
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
    if(!value) errors['rs'] = 'Input cannot be empty'
    else{errors["rs"] = 
    !(Number.isInteger(Number(value))) || value.length > 2
      ? 'Please Enter an integer with at most 2 digits'
      : '';
    }
    this.setState({
        errors: errors, 
        [name]: value
    })
}
handleSubmit(event) {
    this.props.parentCallback(encode.encode_R_jr(this.props.operation, this.state.rs), 
    (this.props.operation + "  $" + this.state.rs));
    Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
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
              placeholder="rs"/>
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
    if(name === 'hex') {
        this.setState({hex: event.target.checked})
        const imm = document.getElementById('imm').value
        if(event.target.checked) {
          errors["imm"] = 
          !(isHex(imm)) || imm.length > 4
          ? 'Please Enter the part of hexadecimal number after 0x(eg. 1f3e)'
          : '';
        } else {
            if(!value) errors['imm'] = 'Input cannot be empty'   
            else {
              if(!(Number.isInteger(Number(value))) && value !== '-') 
                errors['imm'] = 'Please Enter an integer(eg. 45, -97)'
              else{
                const v = (Number(value) < 0) ? value.slice(1) : value;
                errors["imm"] = v.length > 2 ? 'Please Enter an integer at most 2 digits(eg. 32, -43)': '';
              }
            }
        }
    } else{
      switch (name) {
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
              if(!(Number.isInteger(Number(value))) && value !== '-') 
                errors['imm'] = 'Please Enter an integer(eg. 45, -76)'
              else{
                const v = (Number(value) < 0) ? value.slice(1) : value;
                errors["imm"] = v.length > 2 ? 'Please Enter an integer at most 2 digits(eg. 32, -43)': '';
              }
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
componentWillReceiveProps(nextProps) {
  if (this.props.operation !== nextProps.operation) {
    this.setState({errors: {}});
    Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
  }
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
          <input type="checkbox" id = "hexcheck" name="hex" onChange = {this.handleChange}/>
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
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
buttonDisabled() {
  const rt = this.state.rt;
  const rs = this.state.rs;
  const label = this.state.label;
  for (const [k, v] of Object.entries(this.state.errors))
      if(v) return true
  if(!rs || !rt || !label) return true;
}
handleChange(event) {
  const { name, value } = event.target;
  let errors = this.state.errors;
    switch (name) {
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
      case 'label': 
          if(!value) errors['label'] = 'Input cannot be empty'   
        else {
          if(!value) errors['label'] = 'Input cannot be empty'   
            else {
              if(!(Number.isInteger(Number(value))) && value !== '-') 
                errors['label'] = 'Please Enter an integer(eg. 45, -76)'
              else{
                const v = (Number(value) < 0) ? value.slice(1) : value;
                errors["label"] = v.length > 2 ? 'Please Enter an integer at most 2 digits(eg. 32, -43)': '';
              }
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
    this.props.parentCallback(encode.encoder_I_branch(this.props.operation, this.state.rs, this.state.rt, this.state.label), 
    (this.props.operation + "  $" + this.state.rs + ",  $" + this.state.rt + ",   " + this.state.label));
    Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = "")
    );
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
              placeholder="rs" />
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
              placeholder="rt"  />
            <div>{this.state.errors["rt"]}</div>
          </div>

          <div class="form-inline">
            <input 
              type="text" 
              name="label" 
              onChange={this.handleChange}
              class="form-control" 
              placeholder="label" />
            <div>{this.state.errors["label"]}</div>
          </div>
          <Button onClick = {this.handleSubmit} disabled = {this.buttonDisabled()}>Encode</Button >
        </form>    
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
      errors: {}
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
        if(!value) errors['imm'] = 'Input cannot be empty'   
        else {
          if(!(Number.isInteger(Number(value))) && value !== '-') 
            errors['imm'] = 'Please Enter an integer(eg. 45, -76)'
          else{
            const v = (Number(value) < 0) ? value.slice(1) : value;
            errors["imm"] = v.length > 2 ? 'Please Enter an integer at most 2 digits(eg. 32, -43)': '';
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
    this.props.parentCallback(encode.encoder_I_ls(this.props.operation, this.state.rt, this.state.imm, this.state.rs), 
    (this.props.operation + "  $" + this.state.rt + ",  (" + this.state.imm + ")  $" + this.state.rs));
    Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = "")
    );
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
            <label for = "imm" id = "leftbracket"><strong>(</strong></label>
            <input 
              id = "imm"
              type="text" 
              name="imm" 
              onChange={this.handleChange}
              class="form-control" 
              placeholder="imm" />
            <label for = "imm" id = "rightbracket"><strong>)</strong></label>
            <div>{this.state.errors["imm"]}</div>
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
          <Button onClick = {this.handleSubmit} disabled = {this.buttonDisabled()}>Encode</Button >
        </form>    
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
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
buttonDisabled() {
  const rt = this.state.rt;
  const imm = this.state.imm;
  for (const [k, v] of Object.entries(this.state.errors))
      if(v) return true
  if(!rt || !imm) return true;
}
handleChange(event) {
  const { name, value } = event.target;
  let errors = this.state.errors;
    switch (name) {
      case 'rt':
        if(!value) errors['rt'] = 'Input cannot be empty'   
        else {errors["rt"] = 
        !(Number.isInteger(Number(value))) || value.length > 2
        ? 'Please Enter an integer with at most 2 digits'
        : '';}
        break;
      case 'imm': 
        if(!value) errors['imm'] = 'Input cannot be empty'   
        else {
          if(!(Number.isInteger(Number(value))) && value !== '-') 
            errors['imm'] = 'Please Enter an integer(eg. 45, -76)'
          else{
            const v = (Number(value) < 0) ? value.slice(1) : value;
            errors["imm"] = v.length > 2 ? 'Please Enter an integer at most 2 digits(eg. 32, -43)': '';
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
    this.props.parentCallback(encode.encoder_I_lui(this.props.operation, this.state.rt, this.state.imm), 
    (this.props.operation + "  $" + this.state.rt + ", " + this.state.imm + " "));
    Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = "")
    );
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

export class J extends React.Component {
constructor(props) {
    super(props)
    this.state = {
      expression: "J",
      label:"",
      errors:{}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
buttonDisabled() {
  const rt = this.state.rt;
  const imm = this.state.imm;
  for (const [k, v] of Object.entries(this.state.errors)) if(v) return true
  if(!rt || !imm) return true;
}
handleChange(event) {
  const { name, value } = event.target;
  let errors = this.state.errors;
  if(!value) errors['label'] = 'Input cannot be empty'   
  else {
    errors["label"] = 
    !(isHex(value)) || value.length > 6
    ? 'Please Enter the part of hexadecimal number after 0x(eg. 1f3e)'
    : '';
  }
    this.setState({
      errors: errors, 
      [name]: value,
    })
}
handleSubmit(event) {
  this.props.parentCallback(encode.encoder_J(this.props.operation, this.state.label), 
  (this.props.operation + "  0x"  + this.state.label));
  Array.from(document.querySelectorAll("input")).forEach(
  input => (input.value = "")
  );
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
    <div class="form-inline">
        <form onSubmit={this.handleSubmit}>
          <div class="form-inline">
            <label><strong id = "hexlabel">0x</strong></label>
            <input 
              type="text" 
              name="label" 
              onChange={this.handleChange}
              class="form-control" 
              placeholder="label" />
            <div>{this.state.errors["label"]}</div>
          </div> 
          <Button onClick = {this.handleSubmit} disabled = {this.buttonDisabled()}>Encode</Button >
        </form>
    </div>
    );
}
}
