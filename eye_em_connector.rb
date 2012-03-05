require 'faraday'
require 'json'

class EyeEmConnector

  attr_accessor :client_id, :faraday

  def initialize(client_id)
    @client_id = client_id
  end

  def faraday
    @faraday ||= Faraday.new(:url => 'https://www.eyeem.com/api/v2/', :params => {:client_id => @client_id})
  end

  def albums_recommended(options={})
    basic_request('albums/recommended',options)
  end

  def albums(options={})
    basic_request('albums',options)
  end

  def album(id,options={})
    basic_request('albums/'+id.to_s,options)
  end

  def album_photos(id,options={})
    basic_request('albums/'+id.to_s+'/photos',options)
  end

  def album_likers(id,options={})
    basic_request('albums/'+id.to_s+'/likers',options)
  end

  def album_contributors(id,options={})
    basic_request('albums/'+id.to_s+'/contributors',options)
  end

  def basic_request(endpoint,options={})
    response = faraday.get(endpoint) do |rq|
        options.each do |option, value|
          rq.params[option] = value
        end
      end
    JSON.parse(response.body)
  end

end