import React, { useState, useEffect, useContext } from 'react';
import { MyContext } from '../ChatUI2';
import { drawerContext } from '../App';
import { useHistory } from 'react-router-dom';
import Scrollbar from "react-scrollbars-custom";

export default function ContactsList() {

    const history = useHistory();
    const [active, setActive] = useState('');
    const [flag, setFlag] = useState(false);

    const { rid, setRid, currentUsers, contacts, setContacts, setFilteredContacts} = useContext(MyContext);
    const { setOpen} = useContext(drawerContext);

    const handleSelect = (contact) => {

        setRid({ id: contact.id, name: contact.name })
        setActive(contact.id)
        
        setContacts(contacts.map(item => {
            if (item.id == contact.id) {
                item.unReadMessages = 0;
            }
            return item;
        }))
        setOpen(false)
    }

    useEffect(() => {

        axios.get('/api/allusers')
            .then(response => {
                setContacts(response.data.users.filter(item => item.id != localStorage.getItem('userID')))
                setFilteredContacts(response.data.users.filter(item => item.id != localStorage.getItem('userID')))
                setFlag(!flag)
            })
    }, [])






    return (
        <Scrollbar>
            <div className="card-body contacts_body">
                <ui className="contacts">

                    {

                        contacts.map((contact, index) => (
                            <li
                                key={index}
                                className={active == contact.id ? 'active' : ''}
                                onClick={() => handleSelect(contact)}>

                                <div className="d-flex bd-highlight justify-content-between" style={{ cursor: 'pointer' }}>
                                    <div className='d-flex'>
                                        <div className="img_cont">
                                            <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" />

                                            {
                                                currentUsers.some(user => user.id == contact.id) ? <span className="online_icon" /> : <span className="online_icon offline" />
                                            }

                                        </div>
                                        <div className="user_info">

                                            <span>{contact.name}</span>
                                            {
                                                currentUsers.some(user => user.id == contact.id) ? <p>{contact.name} is online</p> : <p>{contact.name} is offline</p>
                                            }


                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <span className="badge badge-danger" style={{ padding: '5px', fontSize: '18px' }}>
                                            {
                                                contact.unReadMessages != 0 ? contact.unReadMessages : ''
                                            }
                                        </span>
                                    </div>
                                </div>
                            </li>
                        ))

                    }

                </ui>
            </div>
        </Scrollbar>
    )
}