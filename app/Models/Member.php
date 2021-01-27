<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    public function teams() {
        return $this->belongsToMany('App\Models\Team', 'team_member', 'member_id', 'team_id')
        ->withPivot('id', 'member_id', 'team_id', 'admin_member_id');
    }
    
    public function messages() {
        return $this->belongsToMany('App\Models\Team', 'messages', 'member_id', 'team_id')
                    ->withPivot('id', 'member_id', 'team_id', 'message', 'registered_at', 'created_at', 'updated_at');
    }

    public function techs() {
        return $this->belongsToMany('App\Models\Team', 'techs', 'member_id', 'team_id')
                    ->withPivot('id', 'member_id', 'team_id', 'language_id', 'code', 'link', 'command', 'created_at', 'updated_at');
    }
}