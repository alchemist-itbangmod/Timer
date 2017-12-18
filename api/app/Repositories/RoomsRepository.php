<?php

namespace App\Repositories;
use App\Interfaces\RoomsRepositoryInterface;
use App\Models\Rooms;

class RoomsRepository implements RoomsRepositoryInterface
{
  public function get() {
    return true;
  }
}