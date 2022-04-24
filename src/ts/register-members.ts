let txtName: HTMLInputElement = document.querySelector('#txt-name')!;
let txtEmail: HTMLInputElement = document.querySelector('#txt-email')!;
let txtContactNo: HTMLInputElement = document.querySelector('#txt-contact-number')!;
let txtAddress: HTMLInputElement = document.querySelector('#txt-address')!;
let btnRegister: HTMLButtonElement = document.querySelector('#btn-register')!;
let frnRegistration: HTMLFormElement = document.querySelector('#frm-register-members')!;
let btnToast: HTMLButtonElement = document.querySelector('#btn-tst')!;

frnRegistration.addEventListener('submit' , (e)=>{
    e.preventDefault();

    let inputs: HTMLInputElement[] = [txtName, txtEmail, txtAddress];
    let invalidInputElm = inputs.find((input:HTMLInputElement)=>
        input.classList.contains('is-invalid') || input.value.length===0);

    if (invalidInputElm) {
        invalidInputElm.classList.add('is-invalid');
        invalidInputElm.focus();
        invalidInputElm.select();
        return;
    } else {
        let member = {
            name:txtName.value.trim(),
            email:txtEmail.value.trim(),
            address:txtAddress.value.trim(),
            contact_no:txtContactNo.value.trim()
        };
        let memberJson = JSON.stringify(member);

        console.log(memberJson);

        // 1. XMLHttpRequest
        let http = new XMLHttpRequest();

        // 2. Let catch the response
        http.onreadystatechange = () => {
            // This is going to work, when the response is available
            /*console.log(http.status);*/
            if (http.readyState === XMLHttpRequest.DONE) {
                btnRegister.classList.remove('register');

                if (http.status === 201) {
                    console.log(http.responseText);
                } else {
                    console.log("Failed to save the member")
                }
            } else if (http.readyState === XMLHttpRequest.OPENED) {
                btnRegister.classList.add('register');
            }
        };

        // 3. Let's initiate request
        http.open('POST', 'http://localhost:8080/lims/members', true);

        // 4. Let's set some request headers
        http.setRequestHeader('Content-type', 'application/json');

        //5. Let's send the request
        http.send(memberJson);
    }

});

const validationListener = (evt:Event) => {
    if (evt.target instanceof HTMLInputElement) {
        let inputElm=evt.target;
        let regExp: RegExp;

        if (inputElm===txtName){
            regExp = /^[A-Za-z ]+$/;
        } else if (inputElm === txtEmail) {
            regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        } else if (inputElm === txtAddress) {
            regExp = /^[A-Za-z0-9 ,/-]+$/;
        }else {
            regExp = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/;
        }

        inputElm.classList.remove('is-invalid', 'is-valid');
        if (regExp.test(inputElm.value.trim())){
            inputElm.classList.add('is-valid');
        }else{
            inputElm.classList.add('is-invalid');
        }
    }
}

txtName.addEventListener('input', validationListener);
txtEmail.addEventListener('input', validationListener);
txtAddress.addEventListener('input', validationListener);
txtContactNo.addEventListener('input', validationListener);