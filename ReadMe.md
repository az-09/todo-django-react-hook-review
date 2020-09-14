D:\Dev\to-do-django-react-hook>python -m venv venv

D:\Dev\to-do-django-react-hook>venv\Scripts\activate

(venv) D:\Dev\to-do-django-react-hook>pip install django djangorestframework django-cors-headers

(venv) D:\Dev\to-do-django-react-hook>django-admin startproject project

(venv) D:\Dev\to-do-django-react-hook>cd project

(venv) D:\Dev\to-do-django-react-hook\project>python manage.py startapp api


project >> settings.py

    INSTALLED_APPS = [
        ...

        'api.apps.ApiConfig',
        'rest_framework',
        'corsheaders',

    ]

    MIDDLEWARE = [
    ...
    'corsheaders.middleware.CorsMiddleware',
    ]

    CORS_ORIGIN_WHITELIST = [
        'http://localhost:3000',
    ] # add react frontend to whitelist


project >> urls.py

    ...
    from django.urls import path, include

    urlpatterns = [
    ...
        path('api/', include('api.urls')),
    ]

api >> models.py

    class Task(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False, blank=True, null=True)

    def __str__(self):
        return self.title

api >> views.py

api >> urls.py

    from django.urls import path
    from . import views

    urlpatterns = [

    ]

(venv) D:\Dev\to-do-django-react-hook\project>python manage.py makemigrations

(venv) D:\Dev\to-do-django-react-hook\project>python manage.py migrate

api >> serializers.py

    from rest_framework import serializers
    from .models import Task

    class TaskSerializer(serializers.ModelSerializer):
        class Meta:
            model = Task
            fields = '__all__'

api >> views.py

api >> views.py

    urlpatterns = [
        path('', views.apiOverview, name='api-overview'),
        path('task-list/', views.taskList, name='task-list'),
        path('task-detail/<str:pk>/', views.taskDetail, name='task-detail'),
        path('task-create/', views.taskCreate, name='task-create'),
        path('task-update/<str:pk>/', views.taskUpdate, name='task-update'),
        path('task-delete/<str:pk>/', views.taskDelete, name='task-delete'),
    ]

api >> admin.py: Optional

    from .models import Task

    admin.site.register(Task)


(venv) D:\Dev\to-do-django-react-hook\project>python manage.py runserver


http://127.0.0.1:8000/api/

http://127.0.0.1:8000/api/task-create/

    {
        "title":"Test"
    }

http://127.0.0.1:8000/api/task-list/

http://127.0.0.1:8000/api/task-update/1/

    {
        "title":"Test10"
    }

http://127.0.0.1:8000/api/task-delete/1/


### Front-End

D:\Dev\to-do-django-react-hook\project\frontend>npx create-react-app .

D:\Dev\to-do-django-react-hook\project\frontend>yarn start

frontend >> src

Remove everything except App.js, index.js, App.css

frontend >> public >> index.html, to use bootstrap and google font

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">

frontend >> src >> index.js

    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';

    ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
    );


frontend >> src >> App.js

    ...
    return (
        <div className="container">
            <div id="task-container">
                <div id="form-wrapper">
                <TodoForm handleSubmit={handleSubmit} activeItem={activeItem} setActiveItem={setActiveItem} />
                </div>
                <div id="list-wrapper">
                <TodoList todos={todos} strikeUnstrike={strikeUnstrike} startEdit={startEdit} deleteItem={deleteItem} />
                </div>
            </div>
        </div>
  );

frontend >> src >> TodoForm.js
    const handleChange = event => {
        const {name, value} = event.target
        props.setActiveItem({...props.activeItem, [name]: value})
    }

frontend >> src >> ToDoList.js

D:\Dev\to-do-django-react-hook\project\frontend>yarn build # can access to static folder in build folder

project >> settings.py

    TEMPLATES = [

        ...
        'DIRS': [
            BASE_DIR / 'frontend/build'
        ],

    ]


    STATICFILES_DIRS = [
        BASE_DIR / 'frontend/build/static'
    ]

project >> urls.py


    from django.views.generic import TemplateView

    urlpatterns = [
        ...
        path('', TemplateView.as_view(template_name='index.html')),
    ]


(venv) D:\Dev\to-do-django-react-hook\project>python manage.py runserver



Reference:

    https://www.youtube.com/watch?v=W9BjUoot2Eo

    https://github.com/divanov11/React-Django-To-Do-App
    
    https://medium.com/thecodefountain/fetch-api-data-using-useeffect-react-hook-465809ca12c6

