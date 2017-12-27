<?php

namespace App\Repositories;
use App\Models\Room;

class RoomRepository implements RoomRepositoryInterface
{
  protected $rooms;


  public function __construct(){
    $this->rooms = new Room;
  }

  public function getAll() {
    return $this->rooms->get();
  }
}