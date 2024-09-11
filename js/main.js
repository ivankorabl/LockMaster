const resultInput = document.getElementById("inputPassword");
const submitBtn = document.getElementById("submitButton");
const timeGenerate = document.getElementById("timePassword")
const lengthPassword = document.getElementById("lenghtPassword")


function generatePassword(leng){

    //Числа, Символы и алфавиты для надежного пароля
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789"
    const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
    const allChars = upperCase + lowerCase + numbers + specialChars;

    //Буфер случайных байтов
    const randomBuffer = new Uint16Array(leng*10);
    window.crypto.getRandomValues(randomBuffer);


    // выбирается символ из charSet с индексом, полученным после операции взятия остатка.
    function getRandomChar(charSet, index){
        return charSet[randomBuffer[index] % charSet.length];
    }

    //Ассихронная функция для генерации пароля

    async function generatePasswordAsync() {
        
        let password = [
            getRandomChar(upperCase, 0),
            getRandomChar(lowerCase, 1),
            getRandomChar(numbers, 2),
            getRandomChar(specialChars, 3)

        ];

        for (let i = 4; i < leng; i++){
            password.push(getRandomChar(allChars, i));
        }

        await shufferArray(password, randomBuffer.slice(leng));

        return password.join("");       
    }

    async function shufferArray(array, buffer) {
        for(let i = array.length - 1; i>0; i--){
            const h = buffer[i] % (i+1);
            [array[i], array[h]] = [array[h], array[i]];

        }
        
    }

    async function generateEndPassword() {

        let startTime = performance.now();
        const securePassword = await generatePasswordAsync();
        let endTime = performance.now();
        
        console.log(`Сгенерированный пароль:` + securePassword);
        let timeWork = endTime - startTime;

        resultInput.textContent = securePassword;
        timeGenerate.textContent = "Время генерации: " + timeWork.toFixed(2) + " сек.";
        
    }

    generateEndPassword();

}





submitBtn.onclick = function() {
    //Различные проверки
    let lenPass = Number(lengthPassword.value);

    if (!lenPass || isNaN(lenPass) || lenPass < 3 || lenPass > 36) {
        alert("Некорректное значение!");
    } else {
        generatePassword(lenPass);
    }

}
