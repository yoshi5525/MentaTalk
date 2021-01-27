<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Member;
use App\Models\Message;
use App\Models\Tech;
use Exception;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->ajax()) {
            $searchKey = $request->input('team_key');
            $query = DB::table('members');
            $searchMembers = $query->select('id', 'name', 'member_photo')
            ->where('member_key', 'like', $searchKey)
            ->orderBy('name', 'asc')->get();
            return response()->json($searchMembers);
        }
        $members = Member::all();
        return view('team.index', compact('members'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('member.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->ajax()) {
            $techSaved = false;
            $teamId = $request->input('team_id');
            DB::beginTransaction();
            try {
                $message = new Message();
                $current_date_time = date('Y-m-d H:i:s');
                $message->member_id = $request->input('member_id');
                $message->team_id = $request->input('team_id');
                $message->message = $request->input('message');
                $message->registered_at = $current_date_time;
                $message->created_at = $current_date_time;
                $message->updated_at = $current_date_time;
                $message->save();
                if ($request->input('language_id') > 0) {
                    $tech = new Tech();
                    $tech->member_id = $request->input('member_id');
                    $tech->team_id = $request->input('team_id');
                    $tech->language_id = $request->input('language_id');
                    if ($request->input('techKey') === 'code') {
                        $tech->code = $request->input('tech');
                    } else {
                        $tech->code = null;
                    } 
                    if ($request->input('techKey') === 'link') {
                        $tech->link = $request->input('tech');
                    } else {
                        $tech->link = null;
                    }
                    if ($request->input('techKey') === 'command') {
                        $commandStr1 = $request->input('tech');
                        $commandStr2 = substr($commandStr1, 0, -1);
                        $commandStr3 = substr($commandStr2, 1);
                        $tech->command = $commandStr3;
                    } else {
                        $tech->command = null;
                    }
                    $tech->created_at = $current_date_time;
                    $tech->updated_at = $current_date_time;
                    $techSaved = true;
                    $tech->save();
                }
            } catch (Exception $e) {
                DB::rollBack();
                return back()->withInput();
            }
            DB::commit();
            $lastMessageId = DB::table('messages')->where('team_id', $teamId)->max('id');
            $messageQuery = DB::table('messages');
            $newMessages[] = $messageQuery->join('members', 'messages.member_id', '=', 'members.id')
                                            ->select('messages.*', 'members.name', 'members.member_photo')
                                            ->where('messages.team_id', $teamId)->where('messages.id', $lastMessageId)->get();
            // $newMessages[] = $messageQuery->join('members', 'messages.member_id', '=', 'members.id')
            //                     ->where('messages.team_id', $teamId)->where('messages.id', $lastMessageId)->get();
            if ($techSaved) {
                $lastTechId = DB::table('techs')->where('team_id', $teamId)->max('id');
                $techQuery = DB::table('techs');
                $newMessages[] = $techQuery->join('members', 'techs.member_id', '=', 'members.id')
                                            ->select('techs.*', 'members.name', 'members.member_photo')
                                            ->where('techs.team_id', $teamId)->where('techs.id', $lastTechId)->get();
                // $newMessages[] = $techQuery->join('members', 'techs.member_id', '=', 'members.id')
                //                     ->where('techs.team_id', $teamId)->where('techs.id', $lastTechId)->get();
                return response()->json($newMessages);
            }
            return response()->json($newMessages);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
