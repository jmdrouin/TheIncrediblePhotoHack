require 'rubygems'
require 'sinatra'
require "sinatra/reloader" if development?

get '/' do

  erb :photo_hack 
  
end