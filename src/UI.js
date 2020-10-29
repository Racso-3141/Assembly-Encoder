import React from 'react';
import * as encode from './encode.js';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Tippy from '@tippyjs/react';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css'; 
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
            ? 'Input should be a non-negative integer at most 2 digits(eg. 22)'
            : '';}
          break;
        case 'rt':
          if(!value) errors['rt'] = 'Input cannot be empty'   
          else {errors["rt"] = 
          !(Number.isInteger(Number(value))) || value.length > 2
          ? 'Input should be a non-negative integer at most 2 digits(eg. 22)'
          : '';}
          break;
        case 'rd':
          if(!value) errors['rd'] = 'Input cannot be empty'   
          else {errors["rd"] = 
            !(Number.isInteger(Number(value))) || value.length > 2
            ? 'Input should be a non-negative integer at most 2 digits(eg. 22)'
            : '';}
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
      const rd_error = this.state.errors['rd'];
      const rs_error = this.state.errors['rs'];
      const rt_error = this.state.errors['rt'];
      tippy('#btn1', {
        placement: 'top', 
        arrow: true,
        animation: 'shift-toward',
        trigger: 'click',
        content: 'Encoded!',
        hideOnClick: false, 
        onShow(instance) {
          setTimeout(() => {
            instance.hide();
          }, 200);
        }
      });
      return (
    <form onSubmit={this.handleSubmit}>
          <div className="form-inline">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          </InputGroup.Prepend>
          <Tippy content = {rd_error} visible={rd_error} interactive = {true} disabled={!rd_error}>
            <input 
              type="text" 
              name="rd" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="rd"/>
          </Tippy>
          </div>
      
          <div className="form-inline">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          </InputGroup.Prepend>
            <Tippy content = {rs_error} visible={rs_error} interactive = {true} disabled={!rs_error}>
            <input 
              type="text" 
              name="rs" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="rs"  />
            </Tippy>
          </div>

          <div className="form-inline">
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
            </InputGroup.Prepend>
            <Tippy content = {rt_error} visible={rt_error} interactive = {true} disabled={!rt_error}>
            <input 
              type="text" 
              name="rt" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="rt" />
            </Tippy>
          </div>
          <Button id = 'btn1' onClick = {this.handleSubmit} disabled = {this.buttonDisabled()}>Encode</Button >
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
          errors['shamt'] = 'Input should be a integer in [0, 32](eg. 11, 23)'
        else{
          const v = (Number(value) < 0) ? value.slice(1) : value;
          errors["shamt"] = Number(v) < 0 || Number(v) > 32 ? 'Input should be an integer in [0, 32](eg. 11, 23)': '';
        }
      }
      break;
  case 'rt':
    if(!value) errors['rt'] = 'Input cannot be empty'   
    else {errors["rt"] = 
    !(Number.isInteger(Number(value))) || value.length > 2
    ? 'Input should be a non-negative integer at most 2 digits(eg. 9)'
    : '';}
    break;
  case 'rd':
      if(!value) errors['rd'] = 'Input cannot be empty'   
      else {errors["rd"] = 
        !(Number.isInteger(Number(value))) || value.length > 2
        ? 'Input should be a non-negative integer at most 2 digits(eg. 11)'
        : '';}
    break;
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
    if(!rd || !rt || !shamt || shamt === '-') return true;
}
componentWillReceiveProps(nextProps) {
  if (this.props.operation !== nextProps.operation) {
    this.setState({errors: {}});
    Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
  }
}
render() {
    const rd_error = this.state.errors['rd'];
    const rt_error = this.state.errors['rt'];
    const shamt_error = this.state.errors['shamt'];
    tippy('#btn2', {
      placement: 'top', 
      arrow: true,
      animation: 'shift-toward',
      trigger: 'click',
      content: 'Encoded!',
      hideOnClick: false, 
      onShow(instance) {
        setTimeout(() => {
          instance.hide();
        }, 200);
      }
    });
    return (
    <div className="form-inline">
       <form onSubmit={this.handleSubmit}>
          <div className="form-inline">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          </InputGroup.Prepend>
          <Tippy content = {rd_error} visible={rd_error} interactive = {true} disabled={!rd_error}>
            <input 
              type="text" 
              name="rd" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="rd"
              data-tip={this.state.errors["rd"]} data-event = {this.state.errors["rd"] !== ''}
              isInvalid={this.state.errors["rd"] !== ''} />
          </Tippy>
          </div>
      
          <div className="form-inline">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          </InputGroup.Prepend>
          <Tippy content = {rt_error} visible={rt_error} interactive = {true} disabled={!rt_error}>
            <input 
              type="text" 
              name="rt" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="rt"  />
          </Tippy>
          </div>

          <div className="form-inline">
          <Tippy content = {shamt_error} visible={shamt_error} interactive = {true} disabled={!shamt_error}>
            <input 
              type="text" 
              name="shamt" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="shift" />
          </Tippy>
          </div>
          <Button id = 'btn2' onClick = {this.handleSubmit} disabled = {this.buttonDisabled()}>Encode</Button >
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
      ? 'Input should be a non-negative integer at most 2 digits(eg. 22)'
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
    const rs_error = this.state.errors['rs'];
    tippy('#btn3', {
      placement: 'top', 
      arrow: true,
      animation: 'shift-toward',
      trigger: 'click',
      content: 'Encoded!',
      hideOnClick: false, 
      onShow(instance) {
        setTimeout(() => {
          instance.hide();
        }, 200);
      }
    });
    return (
    <div className="form-inline">
        <form onSubmit={this.handleSubmit}>
          <div className="form-inline">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          </InputGroup.Prepend>
          <Tippy content = {rs_error} visible={rs_error} interactive = {true} disabled={!rs_error}>
            <input 
              type="text" 
              name="rs" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="rs"/>
          </Tippy>
          </div>             
          <Button id = 'btn3' onClick = {this.handleSubmit} disabled = {this.buttonDisabled()}>Encode</Button >
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
    if(!rs || !rt || !imm || imm === '-') return true;
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
        ? 'Input should be the partafter 0x at most 4 digits(eg. 1f3e)'
        : '';
    } else
      errors["imm"] = !Number.isInteger(Number(imm)) && imm !== '-' ? 'Input should be an integer(eg. 32, -43)': ''; 
  } else{
    switch (name) {
      case 'rs': 
        if(!value) errors['rs'] = 'Input cannot be empty'
        else{errors["rs"] = 
        !(Number.isInteger(Number(value))) || value.length > 2
          ? 'Input should be a non-negative integer at most 2 digits(eg. 22)'
          : '';}
        break;
      case 'rt':
        if(!value) errors['rt'] = 'Input cannot be empty'   
        else {errors["rt"] = 
        !(Number.isInteger(Number(value))) || value.length > 2
        ? 'Input should be a non-negative integer at most 2 digits(eg. 22)'
        : '';}
        break;
      case 'imm': 
        if(!value) errors['imm'] = 'Input cannot be empty'
        else {
          if(this.state.hex) {
              errors["imm"] = 
              !(isHex(value)) || value.length > 6
              ? 'Input should be the part after 0x at most 4 digits(eg. 1f3e)'
              : '';
          } 
          else errors["imm"] = !Number.isInteger(Number(value)) && value !== '-' ? 'Input should be an integer(eg. 32, -43)': '';
        }
        break;
      default:
        break;
    }
    this.setState({
      [name]: value,
      errors: errors
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
    const rt_error = this.state.errors['rt'];
    const rs_error = this.state.errors['rs'];
    const imm_error = this.state.errors['imm'];
    tippy('#btn4', {
      placement: 'top', 
      arrow: true,
      animation: 'shift-toward',
      trigger: 'click',
      content: 'Encoded!',
      hideOnClick: false, 
      onShow(instance) {
        setTimeout(() => {
          instance.hide();
        }, 200);
      }
    });
    return (
    <div className="form-inline">
        <form onSubmit={this.handleSubmit}>
          <div className="form-inline">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          </InputGroup.Prepend>
          <Tippy content = {rt_error} visible={rt_error} interactive = {true} disabled={!rt_error}>
            <input 
              type="text" 
              name="rt" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="rt" />
          </Tippy>
          </div>
      
          <div className="form-inline">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          </InputGroup.Prepend>
          <Tippy content = {rs_error} visible={rs_error} interactive = {true} disabled={!rs_error}>
            <input 
              type="text" 
              name="rs" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="rs"  />
          </Tippy>
          </div>

          <label>For hexadecimal input check(打勾) this 👉👉👉
            </label>
          <div className="form-inline">
          <input type="checkbox" id = "hexcheck" name="hex" onChange = {this.handleChange}/>
          <label><strong id = "hexlabel">0x</strong></label>
          <Tippy content = {imm_error} visible={imm_error} interactive = {true} disabled={!imm_error}>
            <input 
              id = "imm"
              type="text" 
              name="imm" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="imm" />
          </Tippy>
          </div>
  
             
          <Button id = 'btn4' onClick = {this.handleSubmit} disabled = {this.buttonDisabled()}>Encode</Button >
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
  if(!rs || !rt || !label || label === '-') return true;
}
handleChange(event) {
  const { name, value } = event.target;
  let errors = this.state.errors;
    switch (name) {
      case 'rs': 
        if(!value) errors['rs'] = 'Input cannot be empty'
        else{errors["rs"] = 
        !(Number.isInteger(Number(value))) || value.length > 2
          ? 'Input should be an interger at most 2 digits(eg. 31, -44)'
          : '';}
        break;
      case 'rt':
        if(!value) errors['rt'] = 'Input cannot be empty'   
        else {errors["rt"] = 
        !(Number.isInteger(Number(value))) || value.length > 2
        ? 'Input should be an integer at most 2 digits(eg. 31, -44)'
        : '';}
        break;
      case 'label': 
        if(!value) errors['label'] = 'Input cannot be empty'   
        else errors["label"] = !Number.isInteger(Number(value)) && value !== '-' ? 'Input should be an integer(eg. 32, -43)': '';
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
    const rs_error = this.state.errors['rs'];
    const rt_error = this.state.errors['rt'];
    const label_error = this.state.errors['label'];
    tippy('#btn5', {
      placement: 'top', 
      arrow: true,
      animation: 'shift-toward',
      trigger: 'click',
      content: 'Encoded!',
      hideOnClick: false, 
      onShow(instance) {
        setTimeout(() => {
          instance.hide();
        }, 200);
      }
    });
    return (
    <div className="form-inline">
      <form onSubmit={this.handleSubmit}>
          <div className="form-inline">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          </InputGroup.Prepend>
          <Tippy content = {rs_error} visible={rs_error} interactive = {true} disabled={!rs_error}>
            <input 
              type="text" 
              name="rs" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="rs" />
          </Tippy>
          </div>
      
          <div className="form-inline">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          </InputGroup.Prepend>
          <Tippy content = {rt_error} visible={rt_error} interactive = {true} disabled={!rt_error}>
            <input 
              type="text" 
              name="rt" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="rt"  />
          </Tippy>
          </div>

          <div className="form-inline">
          <Tippy content = {label_error} visible={label_error} interactive = {true} disabled={!label_error}>
            <input 
              type="text" 
              name="label" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="label" />
          </Tippy>
          </div>
          <Button id = 'btn5' onClick = {this.handleSubmit} disabled = {this.buttonDisabled()}>Encode</Button >
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
  if(!rs || !rt || !imm || imm === '-') return true;
}
handleChange(event) {
  const { name, value } = event.target;
  let errors = this.state.errors;
    switch (name) {
      case 'rs': 
        if(!value) errors['rs'] = 'Input cannot be empty'
        else{errors["rs"] = 
        !(Number.isInteger(Number(value))) || value.length > 2
          ? 'Input should be an integer at most 2 digits(eg. 31, -44)'
          : '';}
        break;
      case 'rt':
        if(!value) errors['rt'] = 'Input cannot be empty'   
        else {errors["rt"] = 
        !(Number.isInteger(Number(value))) || value.length > 2
        ? 'Input should be an integer at most 2 digits(eg. 31, -44)'
        : '';}
        break;
      case 'imm': 
        if(!value) errors['imm'] = 'Input cannot be empty'   
        else {
          if(!(Number.isInteger(Number(value))) && value !== '-') errors['imm'] = 'Input should be an integer(eg. 45, -76)'
          else errors["imm"] = !Number.isInteger(Number(value)) && value !== '-' ? 'Input should be an integer(eg. 32, -43)': '';
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
    const rs_error = this.state.errors['rs'];
    const rt_error = this.state.errors['rt'];
    const imm_error = this.state.errors['imm'];
    tippy('#btn6', {
      placement: 'top', 
      arrow: true,
      animation: 'shift-toward',
      trigger: 'click',
      content: 'Encoded!',
      hideOnClick: false, 
      onShow(instance) {
        setTimeout(() => {
          instance.hide();
        }, 200);
      }
    });
    return (
    <div className="form-inline">
        <form onSubmit={this.handleSubmit}>
          <div className="form-inline">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
            </InputGroup.Prepend>
            <Tippy content = {rt_error} visible={rt_error} interactive = {true} disabled={!rt_error}>
            <input 
              type="text" 
              name="rt" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="rt" />
            </Tippy>
          </div>

          <div className="form-inline">
            <label for = "imm" id = "leftbracket"><strong>(</strong></label>
            <Tippy content = {imm_error} visible={imm_error} interactive = {true} disabled={!imm_error}>
            <input 
              id = "imm"
              type="text" 
              name="imm" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="imm" />
              </Tippy>
            <label for = "imm" id = "rightbracket"><strong>)</strong></label>
          </div>

          <div className="form-inline">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
          </InputGroup.Prepend>
          <Tippy content = {rs_error} visible={rs_error} interactive = {true} disabled={!rs_error}>
            <input 
              type="text" 
              name="rs" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="rs"  />
          </Tippy>
          </div>
          <Button id = 'btn6' onClick = {this.handleSubmit} disabled = {this.buttonDisabled()}>Encode</Button >
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
  if(!rt || !imm || imm === '-') return true;
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
        ? 'Input should be the partafter 0x at most 4 digits(eg. 1f3e)'
        : '';
    } else
      errors["imm"] = !Number.isInteger(Number(imm)) && imm !== '-' ? 'Input should be an integer(eg. 32, -43)': ''; 
  } else{
    switch (name) {
      case 'rt':
        if(!value) errors['rt'] = 'Input cannot be empty'   
        else {errors["rt"] = 
        !(Number.isInteger(Number(value))) || value.length > 2
        ? 'Input should be a non-negative integer at most 2 digits(eg. 22)'
        : '';}
        break;
      case 'imm': 
        if(!value) errors['imm'] = 'Input cannot be empty'
        else {
          if(this.state.hex) {
              errors["imm"] = 
              !(isHex(value)) || value.length > 6
              ? 'Input should be the part after 0x at most 4 digits(eg. 1f3e)'
              : '';
          } 
          else errors["imm"] = !Number.isInteger(Number(value)) && value !== '-' ? 'Input should be an integer(eg. 32, -43)': '';
        }
        break;
      default:
        break;
    }
    this.setState({
      [name]: value,
      errors: errors
    })
  }
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
    const rt_error = this.state.errors['rt'];
    const imm_error = this.state.errors['imm'];
    tippy('#btn7', {
      placement: 'top', 
      arrow: true,
      animation: 'shift-toward',
      trigger: 'click',
      content: 'Encoded!',
      hideOnClick: false, 
      onShow(instance) {
        setTimeout(() => {
          instance.hide();
        }, 200);
      }
    });
    return (
    <div className="form-inline">
        <form onSubmit={this.handleSubmit}>
          <div className="form-inline">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
            </InputGroup.Prepend>
            <Tippy content = {rt_error} visible={rt_error} interactive = {true} disabled={!rt_error}>
            <input 
              type="text" 
              name="rt" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="rt" />
            </Tippy>
          </div>

          <label>For hexadecimal input check(打勾) this 👉👉👉
            </label>
          <div className="form-inline">
          <input type="checkbox" id = "hexcheck" name="hex" onChange = {this.handleChange}/>
          <label><strong id = "hexlabel">0x</strong></label>
          <Tippy content = {imm_error} visible={imm_error} interactive = {true} disabled={!imm_error}>
            <input 
              id = "imm"
              type="text" 
              name="imm" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="imm" />
          </Tippy>
          </div>
          <Button id = 'btn7' onClick = {this.handleSubmit} disabled = {this.buttonDisabled()}>Encode</Button >
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
  const label = this.state.label;
  for (const [k, v] of Object.entries(this.state.errors)) if(v) return true
  if(!label || label === '-') return true;
}
handleChange(event) {
  const { name, value } = event.target;
  let errors = this.state.errors;
  if(!value) errors['label'] = 'Input cannot be empty'   
  else {
    errors["label"] = 
    !(isHex(value)) || value.length > 8
    ? 'Input should be the part after 0x at most 8 digits(eg. 1f3e52f0)'
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
    const label_error = this.state.errors['label'];
    tippy('#btn8', {
      placement: 'top', 
      arrow: true,
      animation: 'shift-toward',
      trigger: 'click',
      content: 'Encoded!',
      hideOnClick: false, 
      onShow(instance) {
        setTimeout(() => {
          instance.hide();
        }, 200);
      }
    });
    return (
    <div className="form-inline">
        <form onSubmit={this.handleSubmit}>
          <div className="form-inline">
            <label><strong id = "hexlabel">0x</strong></label>
            <Tippy content = {label_error} visible={label_error} interactive = {true} disabled={!label_error}>
            <input 
              type="text" 
              name="label" 
              onChange={this.handleChange}
              className="form-control" 
              placeholder="label" />
            </Tippy>
          </div> 
          <Button id = 'btn8' onClick = {this.handleSubmit} disabled = {this.buttonDisabled()}>Encode</Button >
        </form>
    </div>
    );
}
}
