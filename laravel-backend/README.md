Installation
# clone the repo
$ git clone https://github.com/yogeshfunde2708/Sign-Users.git

# go into app's directory
$ cd laravel_backend/

# install app's dependencies
$ composer install

# generate app keys
$ php artisan key:generate

# migrate & seed db
$ php artisan migrate:fresh --seed

# generate passport keys
$ php artisan passport:keys

# create  passport personal client
$ php artisan passport:client --personal

# link storage
$ php artisan storage:link

# start app
$ php artisan serve