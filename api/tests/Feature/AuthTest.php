<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class AuthTest extends TestCase
{
    public function testGetApiAuthLoginStatusShouldBe405 ()
    {
        $response = $this->get('/api/auth/login');

        $response->assertStatus(405);
    }

    public function testPostApiAuthLoginWithoutDataStatusShouldBe401 ()
    {
        $response = $this->post('/api/auth/login');

        $response->assertStatus(401);
    }
}
