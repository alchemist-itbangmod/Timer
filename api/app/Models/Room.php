<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = [
        'room_id', 'room_name', 'code_normal', 'code_admin'
    ];
}
