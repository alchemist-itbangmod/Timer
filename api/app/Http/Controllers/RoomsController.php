<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Repositories\RoomsRepositoryInterface;

class RoomsController extends Controller
{
    //
    protected $rooms;
    
    function __construc(RoomsRepositoryInterface $rooms)
    {
        $this->rooms = $rooms;
    }

    function get()
    {
        return 'getRooms';
    }
}
