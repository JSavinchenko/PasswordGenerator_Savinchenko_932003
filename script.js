function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
  
// Функция для генерации пароля
function generatePassword(length, sets) {
    const charSets = {
        numbers: '0123456789',
        symbols: '!@#$%^&*()_+~`|}{[]\:;?><,./-=', 
        uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        lowercase: 'abcdefghijklmnopqrstuvwxyz'
    };
  
    let charset = '';
    sets.forEach(set => {
        charset += charSets[set];
    });
  
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = getRandomNumber(0, charset.length - 1);
        password += charset[randomIndex];
    }
  
    return password;
  }

  // Функция для сохранения данных в файл
function saveDataToFile(data, filename) {
    const blob = new Blob([data], { type: 'text/plain' });

  // Создаем ссылку для скачивания файла
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

  // Симулируем клик по ссылке для скачивания файла
    link.dispatchEvent(new MouseEvent('click'));

  // Освобождаем ресурсы после скачивания файла
    URL.revokeObjectURL(link.href);
}

// Функция для сохранения сгенерированных паролей в файл
function savePasswordsToFile(passwords) {
    const data = passwords.join('\n'); 
    saveDataToFile(data, 'passwords.txt');
}

// Функция для обработки события отправки формы
function handleFormSubmit(event) {
    event.preventDefault(); 

    const length = parseInt(document.getElementById('length').value, 10);
    const sets = Array.from(document.querySelectorAll('input[name="sets"]:checked')).map(input => input.value);
    const count = parseInt(document.getElementById('count').value, 10);

    const passwordsContainer = document.getElementById('container');
    passwordsContainer.innerHTML = '';

    const passwords = [];

    for (let i = 0; i < count; i++) {
        const password = generatePassword(length, sets);
        passwords.push(password);

        const passwordElement = document.createElement('div');
        passwordElement.textContent = password;
        passwordsContainer.appendChild(passwordElement);
    }

    savePasswordsToFile(passwords); // Сохраняем пароли в файл
}

// Навешиваем обработчик события на форму
const passwordForm = document.getElementById('passwordForm');
passwordForm.addEventListener('submit', handleFormSubmit);
