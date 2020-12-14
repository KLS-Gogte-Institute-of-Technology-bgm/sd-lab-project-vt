import React, {useState} from 'react';
import { Row, Col, Card, CardBody, CardTitle, Button, CardFooter, FormInput } from 'shards-react';
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default function AdminLogin(){
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [message, setMessage] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    
    const onUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const login = () => {
        axios.post('http://localhost:4000/admin/login', {
            username: username,
            password: password
        })
        .then(async(resp) => {
            if(resp.data.token){
                setMessage(resp.data.msg)
                await localStorage.setItem('token', resp.data.token)
                await localStorage.setItem('username', resp.data.username)
                setIsLoggedIn(true)
            } else {
                setMessage(resp.data.msg)
                setIsLoggedIn(false)
            }
        })
    }
    return(
        <Row>
            <Col>
            </Col>
            <Col>
                <Card style={{margin: '20%', textAlign: 'center'}}>
                    <CardTitle>Admin Login</CardTitle>
                    <CardBody>
                        <Row style={{margin: '10px'}}><FormInput placeholder="Username" onChange={onUsernameChange}/></Row>
                        <Row style={{margin: '10px'}}><FormInput placeholder="Password" onChange={onPasswordChange}/></Row>
                    </CardBody>
                    <CardFooter><Button onClick={login}>Login</Button></CardFooter>
                    {message ? <p>{message}</p>: null}
                </Card>
            </Col>
            <Col>
            </Col>
            {isLoggedIn ? <Redirect to='/admin/dashboard'/> : <Redirect to='/admin/login'/>}
        </Row>
    );
}