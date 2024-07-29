let $ = document
let inputElem = $.querySelector('.add-input')
let addBtn = $.querySelector('.add')
let deleteBtn = $.querySelector('.del')
let todoListContainer = $.querySelector('.user-todo')
let secondTodoListContainer = $.querySelector('.second-todo-container')
let modalSection = $.querySelector('.modal')

let todosArray = []

addBtn.addEventListener('click', function (event) {
    if (inputElem.value) {
        event.preventDefault()
        let todoObj = {
            id: todosArray.length + 1,
            title: inputElem.value
        }
        inputElem.focus()
        todosArray.push(todoObj)
        setLocalStorage(todosArray)
        todoGenerator(todosArray)
    } else {
        modalSection.style.display = 'block'
        setTimeout(function () {
            modalSection.style.display = 'none'
        }, 2000)

    }
})

function setLocalStorage(localTodosArrayName) {
    localStorage.setItem('todos', JSON.stringify(localTodosArrayName))

}

function todoGenerator(localTodosArrayName) {
    todoListContainer.innerHTML = ''
    let newDivElem, newPElem
    localTodosArrayName.forEach(function (todo) {
        newDivElem = document.createElement('div')
        newDivElem.classList.add('task-container')
        newDivElem.setAttribute('onclick', 'removeTodo(' + todo.id + ')')
        newPElem = document.createElement('p')
        newPElem.classList.add('task')
        newPElem.innerHTML = todo.title
        inputElem.value = ''
        newDivElem.append(newPElem)
        todoListContainer.append(newDivElem)
        
    })
}

function removeTodo(todoId){
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    todosArray = localStorageTodos
    let mainTodoIndex = todosArray.findIndex(function(todo){
        return todo.id === todoId
    })
    todosArray.splice(mainTodoIndex, 1)
    setLocalStorage(todosArray)
    todoGenerator(todosArray)
}

inputElem.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        if (inputElem.value) {
            event.preventDefault()
            let todoObj = {
                id: todosArray.length + 1,
                title: inputElem.value
            }
            inputElem.focus()
            todosArray.push(todoObj)
            setLocalStorage(todosArray)
            todoGenerator(todosArray)
        } else {
            modalSection.style.display = 'block'
            setTimeout(function () {
                modalSection.style.display = 'none'
            }, 2000)

        }

    }
})

function getLocalStorage() {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    if (localStorageTodos) {
        todosArray = localStorageTodos
    } else {
        todosArray = []
    }
    todoGenerator(todosArray)
}

function deleteTodos(){
    todosArray = []
    todoGenerator(todosArray)
    localStorage.removeItem('todos')
}

window.addEventListener('load', getLocalStorage)
deleteBtn.addEventListener('click', deleteTodos)