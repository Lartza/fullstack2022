const Person = ({person, handlePersonRemove}) => {
  return (<p>{person.name} {person.number} <button onClick={() => handlePersonRemove(person)}>delete</button></p>)
}

const Persons = ({persons, filter, handlePersonRemove}) => {
  return (<div>
    {persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => <Person key={person.id} person={person} handlePersonRemove={handlePersonRemove} />)}
  </div>)
}

export default Persons