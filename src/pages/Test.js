import React, {useState} from 'react';



function Test(props) {



    const[fruits, setFruits] = useState(
        [
            {name: 'mango', weight: '10kg', price: '15 euro'},
            {name: 'apple', weight: '20kg', price: '25 euro'},
            {name: 'Orange', weight: '30kg', price: '35 euro'}
        ]
)

    const doClickEvent = () => {
        setFruits([
                    {name: 'Samsung', weight: '10kg', price: '15 euro'},
                    {name: 'Apple', weight: '20kg', price: '25 euro'},
                    {name: 'Orange', weight: '30kg', price: '35 euro'},
                ]
        )
    }

    const changeInput = (event) => {
        setFruits([
            {name: event.target.value, weight: '10kg', price: '15 euro'},
            {name: 'Apple', weight: '20kg', price: '25 euro'},
            {name: 'Orange', weight: '30kg', price: '35 euro'},
        ])
    }


    return (
        <div>
            <button onClick={doClickEvent}> Change state</button>
            <h1> Show me the {fruits[0].name} </h1>
            <h1> Show me the {fruits[1].name} </h1>
            <h1> Show me the {fruits[2].name} </h1>

            <input onChange={changeInput} />
        </div>
    );
}

export default Test;
