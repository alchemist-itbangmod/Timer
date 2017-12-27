<?php

namespace App\Repositories;
use App\Interfaces\RoomsRepositoryInterface;
use App\Models\Rooms;

class RoomRepository implements RoomRepositoryInterface
{
  public function get() {
    return true;
  }
}