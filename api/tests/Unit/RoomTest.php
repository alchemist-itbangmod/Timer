<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Repositories\RoomRepository;

class RoomTest extends TestCase
{
    public function testClassRoomRepositoryShouldNotNull()
    {
        $rooms = new RoomRepository;
        $this->assertNotNull($rooms);
    }

    public function testGetRoomsRepositorySholdBeNotNull()
    {
        $rooms = new RoomRepository;
        $this->assertNotNull($rooms->getAll());
    }
}
