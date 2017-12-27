<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\RoomRepositoryInterface;

class RoomsController extends Controller
{
    //
    protected $rooms;
    
    function __construct(RoomRepositoryInterface $rooms)
    {
        $this->rooms = $rooms;
    }

    function get()
    {
        return 'getRooms';
    }
}
