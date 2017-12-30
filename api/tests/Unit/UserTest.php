<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Repositories\UserRepository;

class UserTest extends TestCase
{
    public function testClasUserRepositoryShouldBeNotNull()
    {
        $users = new UserRepository;
        $this->assertNotNull($users);
    }

    public function testGetAllUserShouldBeNotNull()
    {
        $users = new UserRepository;
        $this->assertNotNull($users->getAll());
    }
}
