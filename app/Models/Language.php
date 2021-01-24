<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Language extends Model
{
    // 1対多
    public function techs() {
        return $this->hasMany('App\Models\Tech');
    }
}
