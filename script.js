const num =['0','1','2','3','4','5','6','7','8','9']
const first = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
const second = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
const third = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const specialCharacters = [
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
    '-', '_', '+', '=', '{', '}', '[', ']', '|', '\\',
    ';', ':', '\'', '\"', ',', '.', '<', '>', '/'
];
let flag='Encode';
function toggle(){
    
    if (flag === 'Encode') { 
        encode();
    } else if (flag === 'Decode') {
        decode();
    }
}

function getRandomNumber() {
    return Math.floor(Math.random() * (5 - 3 + 1)) + 3;
}


function encode() {
    const input = document.getElementById('input');
    const button = document.getElementById('encrypt-button');
    let msg = input.value;
    const x=getRandomNumber();
    let result='en->'+x+"->";


    for(let i=0;i<x;i++) {
        msg=encodeAlgo(msg);
    }

    result+=msg;
    
    button.textContent = 'Decode'
    flag='Decode';
    input.value = result;
}

function encodeAlgo(msg){
    let output = '';

    for (const char of msg) {
        if (num.includes(char)) {
            output += '0'+char      
        } 
        else if (first.includes(char)) {
            output += '1' + first.indexOf(char) ;
        } else if (second.includes(char)) {
            output += '2' + second.indexOf(char) ;
        } else if (third.includes(char)) {
            output += '3' + third.indexOf(char) ;
        } 
        else {
            if (char === ' ')
            {
                output += '41'
            }
            else if (char === '.'  ) 
            {
                output += '42';
            }
            else if (char === '\n')
            {
                output += '43'
            }
            else{
                output += char;
            }
            
        }
        
        output+='.'

    }
    return output;
}


function decode() {
    const input = document.getElementById('input');
    let check='';
    
    const x=input.value[4];
    check= input.value.slice(0,2);
    if(check === 'en' || input.value==='')
    {
        
        const button = document.getElementById('encrypt-button');
        let msg = input.value.slice(7);
        
        for (let i=0; i<x; i++)
        {
            msg=decodeAlgo(msg);
        }
        
        button.textContent='Encode';
        flag='Encode';

        input.value = msg ;
    }
    else{
        alert(" I am not able to Decode this Message!");
    }
}

function decodeAlgo(msg){
    let output = '';
    let lst = [];
    let temp = '';

    for (const char of msg) {
        if (char !== '.') 
        {
            temp += char;
        } 
        else {
            
            lst.push(temp);
            temp = '';
        }
    }
    console.log(lst);

    for (const item of lst) {
        if (parseInt(item) < 10){
            output += num[item[1]];
        }
        else if (parseInt(item) < 20) {
            // console.log(item + " (1): " + first[item[1]]);
            output += first[item[1]];
        } else if (parseInt(item) < 30) {
            // console.log(item + " (2): " + second[item[1]]);
            output += second[item[1]];
        } else if (parseInt(item) < 40) {
            // console.log(item + " (3): " + third[item[1]]);
            output += third[item[1]];
        }else if (parseInt(item) === 41) {
            output += ' ';

        }else if (parseInt(item) === 42){
            output += '.';
        }else if(parseInt(item) === 43)
        {
            output += '\n';
        }else if (specialCharacters.includes(item))
        {
            output += item;
        }
        
    }

    return output;
}

function copyToClipboard() {
   
    const textarea = document.getElementById('input');
    textarea.select();

    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    
}

function clearAll(){
    const textarea = document.getElementById('input');
    textarea.value='';
    textarea.focus();
}

