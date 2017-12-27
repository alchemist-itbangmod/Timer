<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\RoomRepository;

class RoomController extends Controller
{   
    function __construct()
    {
        $this->rooms = new RoomRepository;
    }

    function get()
    {
        return $this->rooms->getAll();
    }
}
