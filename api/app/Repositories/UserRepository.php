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
    return $this->users->create([
        'name' => $data['name'],
        'username' => $data['username'],
        'password' => bcrypt($data['password']),
    ]);
  }

  public function getAll() {
    return $this->users->get();
  }

}