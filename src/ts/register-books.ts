let txtTitle: HTMLInputElement = document.querySelector('#txt-title')!;
let txtCategory: HTMLInputElement = document.querySelector('#txt-category')!;
let txtIsb: HTMLInputElement = document.querySelector('#txt-isb')!;
let txtAuthor: HTMLInputElement = document.querySelector('#txt-author')!;
let txtEdition: HTMLInputElement = document.querySelector('#txt-edition')!;
let btnRegisterBook: HTMLButtonElement = document.querySelector('#btn-register')!;
let frmBookRegistration: HTMLFormElement = document.querySelector('#frm-register-books')!;

frmBookRegistration.addEventListener('submit' , (e)=>{
    e.preventDefault();

    let inputs: HTMLInputElement[] = [txtTitle, txtCategory, txtIsb, txtAuthor, txtEdition];
    let invalidInputElm = inputs.find((input:HTMLInputElement)=>
        input.classList.contains('is-invalid') || input.value.length===0);

    if (invalidInputElm) {
        invalidInputElm.classList.add('is-invalid');
        invalidInputElm.focus();
        invalidInputElm.select();
        return;
    } else {
        let book = {
            title:txtTitle.value.trim(),
            category:txtCategory.value.trim(),
            isbn:txtIsb.value.trim(),
            author:txtAuthor.value.trim(),
            edition:txtEdition.value.trim()
        };
        let bookJson = JSON.stringify(book);

        // 1. XMLHttpRequest
        let http = new XMLHttpRequest();

        // 2. Let catch the response
        http.onreadystatechange = () => {
            // This is going to work, when the response is available
            /*console.log(http.status);*/
            if (http.readyState === XMLHttpRequest.DONE) {
                btnRegisterBook.classList.remove('register');

                if (http.status === 201) {
                    console.log(http.responseText);
                } else {
                    console.log("Failed to save the member")
                }
            } else if (http.readyState === XMLHttpRequest.OPENED) {
                btnRegisterBook.classList.add('register');
            }
        };

        // 3. Let's initiate request
        http.open('POST', 'http://localhost:8080/lims/books', true);

        // 4. Let's set some request headers
        http.setRequestHeader('Content-type', 'application/json');

        //5. Let's send the request
        http.send(bookJson);
    }

});

const bookValidationListener = (evt:Event) => {
    if (evt.target instanceof HTMLInputElement) {
        let inputElm=evt.target;
        let regExp: RegExp;

        if (inputElm===txtTitle){
            regExp = /^[A-Za-z0-9 ]+$/;
        } else if (inputElm === txtIsb) {
            regExp = /^[0-9-]+$/;
        } else if (inputElm === txtAuthor) {
            regExp = /^[A-Za-z0-9 ]+$/;
        }else if (inputElm === txtEdition) {
            regExp = /^[0-9]+$/;
        } else {
            regExp = /^[A-Za-z0-9 ]+$/;
        }

        inputElm.classList.remove('is-invalid', 'is-valid');
        if (regExp.test(inputElm.value.trim())){
            inputElm.classList.add('is-valid');
        }else{
            inputElm.classList.add('is-invalid');
        }
    }
}

txtTitle.addEventListener('input', bookValidationListener);
txtCategory.addEventListener('input', bookValidationListener);
txtIsb.addEventListener('input', bookValidationListener);
txtAuthor.addEventListener('input', bookValidationListener);
txtEdition.addEventListener('input', bookValidationListener);
