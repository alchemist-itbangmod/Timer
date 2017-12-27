<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RoomTest extends TestCase
{
    public function testGetApiRoomStatusShouldBe200 ()
    {
        $response = $this->get('/api/rooms');

        $response->assertStatus(200);
    }
}
