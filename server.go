package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

const (
	host     = "localhost"
	port     = 1323
	user     = "postgres"
	password = " "
	dbname   = "todolist"
)

type Todo struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
	IsShow    bool   `json:"isShow"`
}

var todosList []Todo

func getTodos(c echo.Context) error {
	todos := &todosList
	return c.JSON(http.StatusOK, todos)
}

func addTodo(c echo.Context) error {
	var newTodo Todo

	_ = json.NewDecoder(c.Request().Body).Decode(&newTodo)
	newTodo.ID = uuid.NewString()

	todosList = append(todosList, newTodo)
	return c.JSON(http.StatusCreated, todosList)
}

func updateTodo(c echo.Context) error {
	param := c.Param("id")
	var updateTodo Todo
	_ = json.NewDecoder(c.Request().Body).Decode(&updateTodo)
	c.JSON(http.StatusOK, updateTodo)

	for index, item := range todosList {
		if item.ID == param {
			todosList[index] = updateTodo
		}
	}
	return c.JSON(http.StatusOK, todosList)
}

func deleteTodo(c echo.Context) error {
	param := c.Param("id")
	var indexRemove int

	for index, item := range todosList {
		if item.ID == param {
			indexRemove = index
		}
	}
	todosList := append(todosList[:indexRemove], todosList[indexRemove+1:]...)
	return c.JSON(http.StatusOK, todosList)
}

func main() {
	e := echo.New()

	todosList = append(todosList, Todo{
		ID:        "123423",
		Title:     "Rửa bát",
		Completed: false,
		IsShow:    false,
	})
	todosList = append(todosList, Todo{
		ID:        "341278",
		Title:     "Giặt quần áo",
		Completed: true,
		IsShow:    false,
	})
	todosList = append(todosList, Todo{
		ID:        "345280",
		Title:     "Coding",
		Completed: true,
		IsShow:    false,
	})
	todosList = append(todosList, Todo{
		ID:        "348589",
		Title:     "Qwerty",
		Completed: false,
		IsShow:    false,
	})
	todosList = append(todosList, Todo{
		ID:        "477204",
		Title:     "Đi chơi với công chúa",
		Completed: true,
		IsShow:    false,
	})

	psqlconn := fmt.Sprintf()

	e.GET("/todos", getTodos)
	e.POST("/todos", addTodo)
	e.PUT("/todos/:id", updateTodo)
	e.DELETE("/todos/:id", deleteTodo)

	e.GET("/", func(c echo.Context) error {
		return c.HTML(http.StatusOK, "<h1 style='text-align:center'>Hello World!</h1>")
	})

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:8080"},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))
	e.Logger.Fatal(e.Start(":1323"))
}
