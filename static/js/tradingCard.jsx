
function TradingCard(props) {
  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <img src={props.imgUrl} alt="profile" />
      <p>Skill: {props.skill} </p>
    </div>
  );
}


function TradingCardContainer() {
  const [cards, setCards] = React.useState([]) 

  function addCard(newCard) {
    const currentCards = [...cards];

    setCards([...currentCards, newCard]);
  }

  const tradingCards = [];
  React.useEffect(() => {
    fetch('/cards.json')
    .then((response) => response.json())
    .then((result) => setCards(result.cards))
    }, []);  


  for (const currentCard of cards) {
    tradingCards.push(
      <TradingCard
        key={currentCard.cardId}
        name={currentCard.name}
        skill={currentCard.skill}
        imgUrl={currentCard.imgUrl}
      />,
    );
  }

  return (
    <React.Fragment>
      <AddTradingCard addCard={addCard} />
      <h2>Trading Cards</h2>
      <div className="grid">{tradingCards}</div>
    </React.Fragment>
  );

}

ReactDOM.render(<TradingCardContainer />, document.getElementById('container'));



function AddTradingCard(props) {
  
  const [name, setName] = React.useState("");
  const [skill, setSkill] = React.useState("");
  

  const imputData = {
    'name': name,
    'skill': skill
  };


  function addNewCard() {

    fetch('/add-card', {
      method:'POST',
      body: JSON.stringify(imputData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((answer) => {
         const cardAdded = answer.cardAdded;
         props.addCard(cardAdded);
      });
      
  }

  return (
    <React.Fragment>
      <h2>Add New Trading Card</h2>
      <label htmlFor="nameInput">Name</label>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        id="nameInput"
        style={{ marginLeft: "5px" }}
      ></input>
      <label
        htmlFor="skillInput"
        style={{ marginLeft: "10px", marginRight: "5px" }}
      >
        Skill
      </label>
      <input
        value={skill}
        onChange={(event) => setSkill(event.target.value)}
        id="skillInput"
      ></input>
      <button style={{ marginLeft: "10px" }} onClick={addNewCard}>
        Add
      </button>
    </React.Fragment>
  );
}