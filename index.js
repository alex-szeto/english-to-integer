let numberConverter = function(num, output=[]) {
    let smallNums = ["Zero","One","Two","Three","Four","Five","Six","Seven","Eight","Nine"]
    let tens = ["Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen"]
    let doubleDigits = ["Ten","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"]
    let prefix = ["Hundred", "Thousand", "Million", "Billion", "Trillion", "Quadrillion"]
    
    if(0 > num){
        num *= -1
        output.push("Negative ")
    }

    let numString = num.toString()
    if(num == 0 && numString.length == 1){return "Zero"}
    if(num == 0){return output}
    
    if(numString.length == 1){
      output.push(smallNums[numString[0]])   
    }
    else if(numString.length == 2 && 20 > num && num>= 10){
       output.push(tens[numString[1]])
       }
    else if(numString.length == 2){
        output.push(doubleDigits[numString[0]-1])
        numberConverter(parseInt(numString.slice(1,2)), output)
    }
    else if(numString.length == 3){
        output.push(smallNums[numString[0]])
        output.push(prefix[0])
        if(numString[1] != 0 || numString[2] != 0){output.push(" and ")}
        numberConverter(parseInt(numString.slice(1,3)), output)
    }
    else if(6 >= numString.length){
        let hundreds = numberConverter(parseInt(numString.slice(0, numString.length - 3)))
        output.push(hundreds)
        output.push(prefix[1])
        numberConverter(parseInt(numString.slice(numString.length-3,numString.length)), output)
    }
    else if(9 >= numString.length){
        let thousands = numberConverter(parseInt(numString.slice(0, numString.length - 6)))
        output.push(thousands)
        output.push(prefix[2])
        numberConverter(parseInt(numString.slice(numString.length-6,numString.length)), output)
    }
    else if(12 >= numString.length){
        let millions = numberConverter(parseInt(numString.slice(0, numString.length - 9)))
        output.push(millions)
        output.push(prefix[3])
        numberConverter(parseInt(numString.slice(numString.length-9,numString.length)), output)
    }
    else if(15 >= numString.length){
        let billions = numberConverter(parseInt(numString.slice(0, numString.length - 12)))
        output.push(billions)
        output.push(prefix[4])
        numberConverter(parseInt(numString.slice(numString.length-12,numString.length)), output)
    }
    else if(18 >= numString.length){
        let trillions = numberConverter(parseInt(numString.slice(0, numString.length - 15)))
        output.push(trillions)
        output.push(prefix[5])
        numberConverter(parseInt(numString.slice(numString.length-15,numString.length)), output)
    }
    
    return output.join(" ")
};

let button = document.getElementById("submit")
let field = document.getElementById("int")


button.addEventListener("click", function(){
    let input = document.getElementById("int").value
    let k = document.getElementById("output")
    let convertedNum
    if(input.length == 0){
        k.innerHTML = `<span id="error"><strong>&nbsp;Error:</strong> No input detected&nbsp;</span>`
    }   
    else if (valid(input)){
        convertedNum = numberConverter(input)
        k.innerHTML = `<span id="result"><strong>&nbsp;Your result is:</strong> ${convertedNum}&nbsp;</span>`
    }else{
        k.innerHTML = `<span id="error"><strong>&nbsp;Error:</strong> Invalid Input&nbsp;</span>`
    }
})

field.addEventListener("change", function(){
    button.click()
})

function valid(num){
    return num.match(/^-?\d{1,16}$/)
}