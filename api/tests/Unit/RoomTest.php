<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Repositories\RoomsRepository;

class RoomTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testGetRoomsRepositorySholdBeTrue ()
    {
        $rooms = new RoomsRepository();
        $this->assertEquals($rooms->get(), true);
    }
}
