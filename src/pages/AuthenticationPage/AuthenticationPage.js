import React, { useEffect, useState } from 'react';
import { Col } from 'reactstrap';
import CustomButton from '../../components/CustomButton/CustomButton';
import InputComponent from '../../components/InputComponent/InputComponent';
import './AuthenticationPage.scss';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function AuthenticationPage({ type }) {
    const [state, setState] = useState({});
    const history = useHistory();
    
    useEffect(() => {
        let temp = {};
        if (type === "login") {
            temp = {
                header: "Login",
                subheader: "Get Access to your Orders, Wishlist and Recommendations",
                buttonLable: "Login",
                feilds: [signUpFeilds[2], signUpFeilds[3]],
            };
        }
        else if (type === "signup") {
            temp = {
                header: "Sign Up",
                subheader: "We do not share your personal details with anyone",
                buttonLable: "Signup",
                feilds: signUpFeilds,
            }
        }
        setState(temp);
    }, [type])

    const signUpFeilds = [{
        label: "First Name",
        id: "first-name",
        type: 'text',
        required: true,
    },
    {
        label: "Last Name",
        id: "last-name",
        type: 'text',
        required: true,
    },
    {
        label: "Email",
        id: "email",
        type: 'email',
        required: true,

    },
    {
        label: "Password",
        id: "password",
        type: 'password',
        required: true,
    },
    {
        label: "Confirm Password",
        id: "confirm-password",
        type: 'password',
        required: true,
    }];

    const handleFormSubmit = (e) => {
        e.preventDefault();
        history.push('/categories');
    }


    return <section className="row mt-5 authentication">
        <Col xs="12" md="6" className="authentication__headings p-md-5 px-5 py-3">
            <h1>{state?.header}</h1>
            <p className="py-3">{state?.subheader}</p>
        </Col>
        <Col xs="12" md="6" className="authentication__feilds px-5">
            <form onSubmit={handleFormSubmit}>
                {
                    (state.feilds || []).map(input => <InputComponent {...input} className="my-4" />)
                }
                <CustomButton text={state?.buttonLable} />
            </form>
        </Col>
    </section>;
}

export default AuthenticationPage;
