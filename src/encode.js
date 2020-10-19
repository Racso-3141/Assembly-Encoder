let hexToBinary = require('hex-to-binary');

//opcode dictionary-I; J. R type always has opcode 000000
let op_dict = {
    addi: "001000", addiu: "001001", andi: "001100", ori: "001101",  slti: "001010",
    sltiu: "001011", xori: "001110", beq: "000100",  bne: "000101", lb: "100000", 
    lbu: "100100", lw: "100011", sb:  "101000", sw:  "101011",  lui: "001111",
    j: "000010", jal:  "000011"
};

// function code dictionary-R type
let func_dict = {
    add: "100000", addu: "100001", and: "100100", or: "100101", nor: "100111",
    slt: "101010", sltu: "101011", sub: "100010", subu: "100011", div: "011010",
    divu: "011011", mult: "011000", multu: "011001", xor: "100110", sll: "000000",
    srl: "000010", jr: "001000"
}


export function encode_R_common(operation, rs_, rt_, rd_) {
    const opcode = "000000";
    let rs = (rs_ >>> 0).toString(2);
    rs = "0".repeat(5 - rs.length) + rs;
    let rt = (rt_ >>> 0).toString(2);
    rt = "0".repeat(5 - rt.length) + rt;
    let rd = (rd_ >>> 0).toString(2);
    rd = "0".repeat(5 - rd.length) + rd;
    const shamt = "00000"
    const funct = func_dict[operation];
    return opcode + rs  + rt  + rd + shamt + funct;
}

export function encode_R_shift(operation, rd_, rt_, shamt_) {
    const opcode = "000000";
    const rs = "00000";
    let rt = (rt_ >>> 0).toString(2);
    rt = "0".repeat(5 - rt.length) + rt;
    let rd = (rd_ >>> 0).toString(2);
    rd = "0".repeat(5 - rd.length) + rd;
    let shamt = (shamt_ >>> 0).toString(2);
    shamt = "0".repeat(5 - shamt.length) + shamt;
    const funct = func_dict[operation];
    return opcode + rs  + rt  + rd + shamt + funct;
}

export function encode_R_jr(operation, rs_) {
    const opcode = "000000";
    let rs = (rs_ >>> 0).toString(2);
    rs = "0".repeat(5 - rs.length) + rs;
    const rt = "00000";
    const rd = "00000";
    const shamt = "00000";
    const funct = func_dict[operation];
    return opcode + rs  + rt  + rd + shamt + funct;
}

export function encoder_I_common(operation, rt_, rs_, imm_) {
    const opcode = op_dict[operation];
    let rs = (rs_ >>> 0).toString(2);
    rs = "0".repeat(5 - rs.length) + rs;
    let rt = (rt_ >>> 0).toString(2);
    rt = "0".repeat(5 - rt.length) + rt;
    let imm = (imm_ >>> 0).toString(2);
    imm = (imm_ < 0) ? (imm.slice(-16)): ("0".repeat(16 - imm.length) + imm);
    return opcode + rs  + rt + imm;
}

export function encoder_I_branch(operation, rs_, rt_, label_) {
    const opcode = op_dict[operation];
    let rs = (rs_ >>> 0).toString(2);
    rs = "0".repeat(5 - rs.length) + rs;
    let rt = (rt_ >>> 0).toString(2);
    rt = "0".repeat(5 - rt.length) + rt;
    let label = (label_ >>> 0).toString(2);
    label = (label_ < 0) ? (label.slice(-16)): ("0".repeat(16 - label.length) + label);
    return opcode + rs  + rt + label;
}

export function encoder_I_ls(operation, rt_, imm_, rs_) {
    const opcode = op_dict[operation];
    let rs = (rs_ >>> 0).toString(2);
    rs = "0".repeat(5 - rs.length) + rs;
    let rt = (rt_ >>> 0).toString(2);
    rt = "0".repeat(5 - rt.length) + rt;
    let imm = (imm_ >>> 0).toString(2);
    imm = (imm_ < 0) ? (imm.slice(-16)): ("0".repeat(16 - imm.length) + imm);
    return opcode + rs  + rt + imm;
}

export function encoder_I_lui(operation, rt_, imm_) {
    const opcode = op_dict[operation];
    let rs = "00000";
    let rt = (rt_ >>> 0).toString(2);
    rt = "0".repeat(5 - rt.length) + rt;
    let imm = (imm_ >>> 0).toString(2);
    imm = (imm_ < 0) ? (imm.slice(-16)): ("0".repeat(16 - imm.length) + imm);
    return opcode + rs  + rt + imm;
}

export function encoder_J(operation, addr_) {
    const opcode = op_dict[operation];
    let addr = (addr_ >>> 0).toString(2);
    addr = "0".repeat(32 - addr.length) + addr;
    addr = addr.slice(4, 30);
    return opcode + addr;
}