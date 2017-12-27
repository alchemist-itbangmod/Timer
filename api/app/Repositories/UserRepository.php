<?php
namespace App\Repositories;

use App\User;

class UserRepository implements UserRepositoryInterface
{
  protected $users;

  public function __construct(){
    $this->users = new User;
  }

  public function create($data) {
    try {
      return $this->users->create([
          'name' => $data['name'],
          'username' => $data['username'],
          'password' => bcrypt($data['password']),
      ]);
    } catch (QueryException $e) {
      return $e;
    }
  }

}