const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if (value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Вам многому нужно научиться", 0),
	new Result("Вы уже неплохо разбираетесь", 7),
	new Result("Ваш уровень компетенции выше среднего", 12),
	new Result("Вы в совершенстве знаете основы компетенции", 16)
];

//Массив с вопросами
const questions = 
[
	new Question("Когда у меня возникает проблема, я пытаюсь решить ее сам, прежде чем спрашивать босса что делать", 
	[
		new Answer("Никогда", 0),
		new Answer("Редко", 0),
		new Answer("Иногда", 0),
		new Answer("Часто", 1)
	]),

	new Question("Я корректирую членов команды всякий раз, когда вижу, что их поведение негативно влияет на уровень обслуживания клиентов", 
	[
		new Answer("Никогда", 0),
		new Answer("Редко", 0),
		new Answer("Иногда", 0),
		new Answer("Часто", 1)
	]),

	new Question("Собираю информацию из различных источников, могу находить интересные и нетривиальные данные, факты; внимателен к деталям и тщателен при работе с информацией", 
	[
		new Answer("Крайне редко", 0),
		new Answer("Иногда, время от времени", 0),
		new Answer("В большинстве стандартных рабочих ситуаций", 0),
		new Answer("Всегда, в том числе в сложных, нестандартных ситуациях", 1)
	]),

	new Question("Вижу и понимаю индивидуальные особенности и состояния других людей, учитываю это при взаимодействии, могу сопереживать, поддержать", 
	[
		new Answer("Крайне редко", 0),
		new Answer("Иногда, время от времени", 0),
		new Answer("В большинстве стандартных рабочих ситуаций", 0),
		new Answer("Всегда, в том числе в сложных, нестандартных ситуациях", 1)
	]),

	new Question("Открыт новым знаниям, внимателен к идеям других, вижу содержащиеся в них возможности, умею подхватить и развить интересную идею", 
	[
		new Answer("Крайне редко", 0),
		new Answer("Иногда, время от времени", 0),
		new Answer("В большинстве стандартных рабочих ситуаций", 0),
		new Answer("Всегда, в том числе в сложных, нестандартных ситуациях", 1)
	]),

	new Question("Отслеживаю тренды в профессиональной области, новые технологии, инструменты, в том числе зарубежные, пробую/внедряю в практику организации", 
	[
		new Answer("Крайне редко", 0),
		new Answer("Иногда, время от времени", 0),
		new Answer("В большинстве стандартных рабочих ситуаций", 0),
		new Answer("Всегда, в том числе в сложных, нестандартных ситуациях", 1)
	]),

	new Question("Проявляю искренний интерес к сфере деятельности организации, в которой работаю, разделяю и транслирую ценности и смыслы того, что делает организация, защищаю ее интересы",
	[
		new Answer("Крайне редко", 0),
		new Answer("Иногда, время от времени", 0),
		new Answer("В большинстве стандартных рабочих ситуаций", 0),
		new Answer("Всегда, в том числе в сложных, нестандартных ситуациях", 1)
	]),

	new Question("Умею слушать других, интересуюсь их мнением, могу понять точку зрения другого человека, даже если не согласен с ней, уважаю различные позиции",
	[
		new Answer("Крайне редко", 0),
		new Answer("Иногда, время от времени", 0),
		new Answer("В большинстве стандартных рабочих ситуаций", 1),
		new Answer("Всегда, в том числе в сложных, нестандартных ситуациях", 1)
	]),

	new Question("Способен действовать при отсутствии подробного плана, проактивно реагировать на возникающие события",
	[
		new Answer("Крайне редко", 0),
		new Answer("Иногда, время от времени", 1),
		new Answer("В большинстве стандартных рабочих ситуаций", 0),
		new Answer("Всегда, в том числе в сложных, нестандартных ситуациях", 0)
	]),

	new Question("Адаптируюсь к ситуации: меняю привычные, автоматические способы работы и поведения на новые, более эффективные в той или иной ситуации",
	[
		new Answer("Крайне редко", 0),
		new Answer("Иногда, время от времени", 0),
		new Answer("В большинстве стандартных рабочих ситуаций", 1),
		new Answer("Всегда, в том числе в сложных, нестандартных ситуациях", 1)
	]),

	new Question("Способен быстро восстанавливаться после сложных периодов, высоких нагрузок",
	[
		new Answer("Крайне редко", 0),
		new Answer("Иногда, время от времени", 0),
		new Answer("В большинстве стандартных рабочих ситуаций", 1),
		new Answer("Всегда, в том числе в сложных, нестандартных ситуациях", 1)
	]),

	new Question("Умею работать в условиях многозадачности и разноплановости задач: определяю, какие задачи нужно реализовывать самостоятельно, какие можно делегировать, на какие задачи нужно привлечь внешних экспертов",
	[
		new Answer("Крайне редко", 0),
		new Answer("Иногда, время от времени", 0),
		new Answer("В большинстве стандартных рабочих ситуаций", 0),
		new Answer("Всегда, в том числе в сложных, нестандартных ситуациях", 1)
	]),

	new Question("Генерирую идеи, могу выходить за рамки привычного, находить нестандартные подходы, форматы, сценарии",
	[
		new Answer("Крайне редко", 0),
		new Answer("Иногда, время от времени", 0),
		new Answer("В большинстве стандартных рабочих ситуаций", 0),
		new Answer("Всегда, в том числе в сложных, нестандартных ситуациях", 1)
	]),

	new Question("Отношусь к ошибкам и неудачам как к полезному опыту, возможности протестировать и улучшить свой подход",
	[
		new Answer("Крайне редко", 0),
		new Answer("Иногда, время от времени", 0),
		new Answer("В большинстве стандартных рабочих ситуаций", 0),
		new Answer("Всегда, в том числе в сложных, нестандартных ситуациях", 1)
	]),

	new Question("Упорен и целеустремлен, делаю все от меня зависящее, чтобы организация могла в полной мере достичь своих целей",
	[
		new Answer("Крайне редко", 0),
		new Answer("Иногда, время от времени", 0),
		new Answer("В большинстве стандартных рабочих ситуаций", 0),
		new Answer("Всегда, в том числе в сложных, нестандартных ситуациях", 1)
	]),

	new Question("Умею сохранять свои границы, говорить «нет», выходить из разрушающего его взаимодействия, устанавливать комфортную дистанцию с человеком",
	[
		new Answer("Крайне редко", 0),
		new Answer("Иногда, время от времени", 0),
		new Answer("В большинстве стандартных рабочих ситуаций", 0),
		new Answer("Всегда, в том числе в сложных, нестандартных ситуациях", 1)
	]),


	new Question("Мотивирую коллег и партнеров на реализацию миссии, целей и задач организации, пробуждаю энергию и драйв",
	[
		new Answer("Крайне редко", 0),
		new Answer("Иногда, время от времени", 0),
		new Answer("В большинстве стандартных рабочих ситуаций", 0),
		new Answer("Всегда, в том числе в сложных, нестандартных ситуациях", 1)
	])
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { 
			Click(e.target.getAttribute("index")); 
		});
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}
