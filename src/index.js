import React from 'react';
import ReactDOM from 'react-dom';
import * as encode from './encode.js';

class R_common extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expression: "R_common", 
      rs: "",
      rt: "",
      rd: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    this.props.parentCallback(encode.encode_R_common(this.props.operation, this.state.rs, this.state.rt, this.state.rd));
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <h2>R_common</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            $
          <input type="text" name="rd" onChange={this.handleChange}/>
          ，
          </label>
          <label>
            $
          <input type="text" name="rs" onChange={this.handleChange}/>
          ，
          </label>
          <label>
            $
          <input type="text" name="rt" onChange={this.handleChange}/>
          </label>
          &nbsp;
          <input type="submit" value="Encode" />
        </form>
      </div>
    );
  }
}

class R_shift extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expression: "R_shift", 
      rd: "",
      rt: "",
      shamt: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    this.props.parentCallback(encode.encode_R_shift(this.props.operation, this.state.rd, this.state.rt, this.state.shamt));
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <h2>R_shift</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            $
          <input type="text" name="rd" onChange={this.handleChange}/>
          ，
          </label>
          <label>
            $
          <input type="text" name="rt" onChange={this.handleChange}/>
          ，
          </label>
          <label>
          <input type="text" name="shamt" onChange={this.handleChange}/>
          </label>
          &nbsp;
          <input type="submit" value="Encode" />
        </form>
      </div>
    );
  }
}

class R_jr extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expression: "R_jr", 
      rs: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    this.props.parentCallback(encode.encode_R_jr(this.props.operation, this.state.rs));
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <h2>R_jr</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            $
          <input type="text" name="rs" onChange={this.handleChange}/>
          </label>
          &nbsp;
          <input type="submit" value="Encode" />
        </form>
      </div>
    );
  }
}
 
class I_common extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expression: "I_common", 
      rt: "",
      rs: "",
      imm: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    this.props.parentCallback(encode.encoder_I_common(this.props.operation, this.state.rt, this.state.rs, this.state.imm));
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <h2>I_common</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            $
          <input type="text" name="rt" onChange={this.handleChange}/>
          ，
          </label>
          <label>
            $
          <input type="text" name="rs" onChange={this.handleChange}/>
          ，
          </label>
          <label>
          <input type="text" name="imm" onChange={this.handleChange}/>
          </label>
          &nbsp;
          <input type="submit" value="Encode" />
        </form>
        <h1>{this.state.isSubmitted && this.state.result}</h1>
      </div>
    );
  }
}

class I_bitwise extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expression: "I_bitwise", 
      rt: "",
      rs: "",
      hex: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    this.props.parentCallback(encode.encoder_I_bitwise(this.props.operation, this.state.rt, this.state.rs, this.state.hex));
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <h2>I_bitwise</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            $
          <input type="text" name="rt" onChange={this.handleChange}/>
          ，
          </label>
          <label>
            $
          <input type="text" name="rs" onChange={this.handleChange}/>
          ，
          </label>
          <label>
            <strong>0x</strong>
          <input type="text" name="hex" onChange={this.handleChange}/>
          </label>
          &nbsp;
          <input type="submit" value="Encode" />
        </form>
      </div>
    );
  }
}

class I_branch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expression: "I_branch",
      rs: "",
      rt: "",
      label: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    this.props.parentCallback(encode.encoder_I_branch(this.props.operation, this.state.rs, this.state.rt, this.state.label));
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <h2>I_branch</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            $
          <input type="text" name="rs" onChange={this.handleChange}/>
          ，
          </label>
          <label>
            $
          <input type="text" name="rt" onChange={this.handleChange}/>
          ，
          </label>
          <label>
          <input type="text" name="label" onChange={this.handleChange}/>
          </label>
          &nbsp;
          <input type="submit" value="Encode" />
        </form>
      </div>
    );
  }
}

class I_ls extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expression: "I_ls", 
      rt: "",
      imm: "",
      rs: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    this.props.parentCallback(encode.encoder_I_ls(this.props.operation, this.state.rt, this.state.imm, this.state.rs));
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <h2>I_ls</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            $
          <input type="text" name="rt" onChange={this.handleChange}/>
          ，
          </label>
          <label>
            (
          <input type="text" name="imm" onChange={this.handleChange}/>
            ) $
          </label>
          <label>
          <input type="text" name="rs" onChange={this.handleChange}/>
          </label>
          &nbsp;
          <input type="submit" value="Encode" />
        </form>
        <h1>{this.state.isSubmitted && this.state.result}</h1>
      </div>
    );
  }
}

class I_lui extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expression: "I_lui",
      rt: "",
      imm: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    this.props.parentCallback(encode.encoder_I_lui(this.props.operation, this.state.rt, this.state.imm))
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <h2>I_lui</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            $
          <input type="text" name="rt" onChange={this.handleChange}/>
          ，
          </label>
          <label>
          <input type="text" name="imm" onChange={this.handleChange}/>
          </label>
          &nbsp;
          <input type="submit" value="Encode" />
        </form>
      </div>
    );
  }
}

class J extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expression: "J",
      label:"",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }
  handleSubmit(event) {
    this.props.parentCallback(encode.encoder_J(this.props.operation, this.state.label));
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <h2>J</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            <strong>0x</strong>
          <input type="text" name="label" onChange={this.handleChange}/>
          </label>
          &nbsp;
          <input type="submit" value="Encode" />
        </form>
        <h1>{this.state.isSubmitted && this.state.result}</h1>
      </div>
    );
  }
}

class Encode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expression: "default",
      operation: "", 
      result:"666"
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
    if (expression === "default") {
      ui = (<h1>Select a function above</h1>)
    } else if (expression === "R_common") {
      ui = <R_common operation = {operation} parentCallback = {this.getResult}/>
    } else if(expression === "R_shift") {
      ui = <R_shift operation = {operation} parentCallback = {this.getResult}/>
    } else if(expression === "R_jr") {
      ui = <R_jr operation = {operation} parentCallback = {this.getResult}/>
    } else if(expression === "I_common") {
      ui = <I_common operation = {operation} parentCallback = {this.getResult}/>
    } else if(expression === "I_bitwise") {
      ui = <I_bitwise operation = {operation} parentCallback = {this.getResult}/>
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
            select the function name:
            <select onChange={this.handleChange}>
              <option>select</option>
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
              <option value="I_bitwise">andi</option>
              <option value="I_bitwise">ori</option>
              <option value="I_common">slti</option>
              <option value="I_common">sltiu</option>
              <option value="I_bitwise">xori</option>
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
      </div>
    );
  }
}

ReactDOM.render(<Encode />, document.getElementById('root'));
