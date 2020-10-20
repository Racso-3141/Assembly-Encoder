import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import * as encode from './encode.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

const isHex = require('is-hex');

export class R_common extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        expression: "R_common", 
        rs: "",
        rt: "",
        rd: "",
        validated: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value}); 
    }
    handleSubmit(event) {
      this.props.parentCallback(encode.encode_R_common(this.props.operation, this.state.rs, this.state.rt, this.state.rd));
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
        <div>
          <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                    name = "rd"
                    type="text"
                    placeholder="rd"
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
                    name = "rs"
                    type="text"
                    placeholder="rs"
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
                            name = "rt"
                            type="text"
                            placeholder="rt"
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
  
export class R_shift extends React.Component {
constructor(props) {
    super(props)
    this.state = {
    expression: "R_shift", 
    rd: "",
    rt: "",
    shamt: "",
    validated: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
}
handleSubmit(event) {
    this.props.parentCallback(encode.encode_R_shift(this.props.operation, this.state.rd, this.state.rt, this.state.shamt));
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
    <div>
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                    name = "rd"
                    type="text"
                    placeholder="rd"
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
                            name = "shamt"
                            type="text"
                            placeholder="shift"
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

export class R_jr extends React.Component {
constructor(props) {
    super(props)
    this.state = {
    expression: "R_jr", 
    rs: "",
    validated: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
}
handleSubmit(event) {
    this.props.parentCallback(encode.encode_R_jr(this.props.operation, this.state.rs));
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
    <div>
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
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
            </Form.Row>
            <Form.Row>
            </Form.Row>
            <Button type="submit">Encode</Button>
        </Form>
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
    validated: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
}
handleSubmit(event) {
    this.props.parentCallback(encode.encoder_I_common(this.props.operation, this.state.rt, this.state.rs, this.state.imm));
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
    <div>
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
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <InputGroup>
                        <Form.Control
                            name = "imm"
                            type="text"
                            placeholder="immediate"
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
    this.props.parentCallback(encode.encoder_I_branch(this.props.operation, this.state.rs, this.state.rt, this.state.label));
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
    <div>
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
    this.props.parentCallback(encode.encoder_I_ls(this.props.operation, this.state.rt, this.state.imm, this.state.rs));
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
    <div>
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
    this.props.parentCallback(encode.encoder_I_lui(this.props.operation, this.state.rt, this.state.imm))
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
    <div>
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
}
handleSubmit(event) {
    this.props.parentCallback(encode.encoder_J(this.props.operation, this.state.label));
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
    <div>
        <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationCustomUsername">
                    <InputGroup>
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
