<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tech extends Model
{
    protected $table = 'techs';
    // 多対1
    public function language() {
        return $this->belongsTo('App\Models\Language');
    }
}
