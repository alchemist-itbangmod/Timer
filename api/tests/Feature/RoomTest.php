<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RoomTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample ()
    {
        $this->assertTrue(true);
    }

    public function testGetApiRoomStatusShouldBe200 ()
    {
        $response = $this->get('/api/rooms');

        $response->assertStatus(200);
    }
}
