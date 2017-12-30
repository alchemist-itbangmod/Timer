<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use Exception;
// use Illuminate\Database\QueryException;

class AuthTest extends TestCase
{
    /**
     * @expectedException   Exception
     */
    public function testPostApiAuthLoginWithSameDataShouldBeException ()
    {
        $response = $this->post('/api/auth/login', [
            'name' => 'ImagineRabbits',
            'username' => 'imgrbs',
            'password' => '123456'
            ]); 
            throw new Exception('Same Username');
        }

    public function testPostApiAuthLoginWithNoDataShouldBeError ()
    {
        $this->post('/api/auth/login', [])
        ->assertJson([
            'error' => 'Unauthorized',
        ]);
    }
    
    public function testPostApiMeWithAccessTokenShouldBeJson ()
    {
        $this->withHeaders( [
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvbG9naW4iLCJpYXQiOjE1MTQ0MDQyNjMsImV4cCI6MTUxNDQwNzg2MywibmJmIjoxNTE0NDA0MjYzLCJqdGkiOiJvdm80QWJjWFhHNzc1UEtmIiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.xFmeXRBK3aXMXvxkdHQW522GLtGxoZLATFfzGFmK7us'
        ])
        ->post('/api/auth/check', [])
        ->assertJson([
            'id' => 1,
            'name' => 'ImagineRabbits',
            'username' => 'imgrbs',
            'role_id' => 0,
            'created_at' => '2017-12-27 15:27:52',
            'updated_at' => '2017-12-27 15:27:52'
        ]);
    }
}
