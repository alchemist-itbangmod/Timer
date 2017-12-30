<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    public function testGetApiRoomStatusShouldBe200 ()
    {
        $response = $this->get('/api/users');

        $response->assertStatus(200);
    }

    public function testPostApiRoomStatusShouldBe500 ()
    {
        $response = $this->Post('/api/users');

        $response->assertStatus(500);
    }
}